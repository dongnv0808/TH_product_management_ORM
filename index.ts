import bodyParser from "body-parser";
import express from "express";
import multer from "multer";
import { AppdDataSource } from "./src/data-source";
import { Books } from "./src/entity/Book";
const upload = multer();
const port = 3000;

AppdDataSource.initialize().then(async connection => {
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', './src/view')
    app.use(express.json());
    app.use(bodyParser.json());
    const bookRepository = connection.getRepository(Books);

    app.get('/', async (req, res) => {
        let books = await bookRepository.find();
        res.render('list', {books: books});
    })

    app.get('/product/create', async(req, res) => {
        res.render('create');
    })

    app.post('/create', upload.none(), async(req, res) => {
        try{
            let bookSearch = await bookRepository.findOneBy({
                name: req.body.name
            })
            if(bookSearch){
                console.log('Quyen sach da ton tai');
            } else {
                let bookData = req.body;
                let book = await bookRepository.save(bookData);
                if(book){
                    console.log('Tao thanh cong');
                    res.redirect('/');
                }
            }
        } catch (err) {
            console.log(err)
            res.render('/product/create');
        }
    })

    app.get('/product/update/:id', async (req, res) => {
        res.render('update');
    })

    app.post('/product/update/:id', upload.none(),async (req, res) => {
        let book = req.body;
        let id = +req.params.id;
        let bookSearch = await bookRepository.findOneBy({id: id});  
        if(!bookSearch){
            console.log('Sách không tồn tại');
            res.redirect('/');
        } else {
            await bookRepository.merge(bookSearch, book);
            await bookRepository.save(bookSearch);
            console.log('Sửa thành công')
            res.redirect('/')
        }
    })

    app.get('/product/delete/:id', async (req, res) => {
        let id = +req.params.id;
        await bookRepository.delete(id);
        res.redirect('/')
    })

    app.listen(port, () => {
        console.log(`Running http://localhost:${port}`);
    })


})