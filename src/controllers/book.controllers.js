import Book from "../models/book.model";

//Función para añadir libros

export const createBook = async(req, res)=>{
   const { title, author, pages, genre, description } = req.body;

   //Quitar espacios de más al inicio al final.

   if(req.body){
    for(let values in req.body){
      if(typeof req.body[values] === "string"){
        req.body[values] = req.body[values].trim();
      }
    }
   }

    try {
        //validacion para que los datos obligatorios no vengan vacíos.
        if(!title || title === "") return res.status(400).json({errorMessage: "'title' no puede estar vacío."});
        if(!author || author === "") return res.status(400).json({errorMessage: "'author' no puede estar vacío."});
        if(!pages) return res.status(400).json({errorMessage: "'pages' no puede estar vacío."});
        if(!genre || genre === "") return res.status(400).json({errorMessage: "'genre' no puede estar vacío."});

        //validar que title sea único.
        const titleUnique = await Book.findOne({where: {title}});
        if(titleUnique) return res.status(400).json({errorMessage: "'title' debe ser único para cada libro."});
      

        const book = await Book.create({ title, author, pages, genre, description });
        res.status(201).json({Message: "Se ha registrado el libro exitósamente!"}, book);
    } catch (err) {
        res.status(500).json({Error: err.message});
    }
}

//Función para obtener todos los libros

export const getAllBooks = async(req, res)=>{
    try {
        const books = await Book.findAll();
        if(books.length === 0) return res.status(404).json({Message: "La biblioteca está vacía"});

        res.status(200).json(books);
    } catch (er) {
        res.status(500).json({Error: err.message});
    }
}

//Función para obtener libros por id
export const getBooksByID = async(req, res)=>{
    try {
        const book = await Book.findByPk(req.params.id);
        if(!book) res.status(404).json({Message: "libro no encontrado."});

        res.status(200).json(book);

    } catch (er) {
        res.status(500).json({Error: err.message});
    }
}

//Actualizar libros
export const updateBooks = async(req, res)=>{
    
   const { title, author, pages, genre, description } = req.body;

   //Quitar espacios de más al inicio al final.

    if(req.body){
      for(let values in req.body){
        if(typeof req.body[values] === "string"){
          req.body[values] = req.body[values].trim();
        }
      }
    }

    try {

        //validar que title sea único.
        if(title){
            const titleUnique = await Book.findOne({where: {title}});
            if(titleUnique) return res.status(400).json({errorMessage: "'title' debe ser único para cada libro."});
        }
      

        const [updated] = await Book.update({ title, author, pages, genre, description },{
            where: {id: req.params.id}
        });

        if(updated === 0) return res.status(404).json({errorMessage: "El libro no ha sido encontrado."});
       
        res.status(201).json({ Message: "Se han actualizado los datos del libro." })
    } catch (err) {
        res.status(500).json({Error: err.message});
    }
}

//funcion para eliminar libros.

export const deleteBooks = async(req, res)=>{
    try {
        const deleted = Book.destroy({where: {id: req.params.id}});
        if(deleted === 0) return res.status(404).json({Message: "No se ha encontrado el libro"});

        res.status(204).json({Message: "El libro ha sido eliminado."})
    } catch (err) {
        res.status(500).json({Error: err.message});
    }
}