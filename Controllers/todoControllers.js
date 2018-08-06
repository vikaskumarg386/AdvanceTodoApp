var bodyParser=require('body-parser')
var mongoose=require('mongoose')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var todoList=[{item:'fill tank'},{item:'go market'},{item:'take breakfast'},{item:'do coding'}]

//connecting to database
mongoose.connect('mongodb://test:vikas123@ds157901.mlab.com:57901/todotest')
//creating schema
var todoSchema=new mongoose.Schema({
    item:String
})
// creating model
var todoModel=mongoose.model('Todo',todoSchema)
module.exports=function(app){

    app.get('/todo',function(req,res){
        todoModel.find({},function(err,data){
            if(err) throw err
            res.render('todo',{todos:data})
        })
      
    })
    app.post('/todo',urlencodedParser,function(req,res){
        console.log(req.body)
        todoList.unshift(req.body)
        todoModel(req.body).save(function(err){
            if(err) throw err
            console.log('item saved')
            todoModel.find({},function(err,data){
                if(err) throw err
                res.render('todo',{todos:data})
            })
        })
        
        
    })
    app.delete('/todo/:item',function(req,res){
        console.log(req.body)
        todoModel.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err
            res.json(data)
        })
        
    })
    
    
    
}