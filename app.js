import express from "express";
import {fetchTeachers,fetchTeacherById,addTeacher,getStudents,getStudentById,addStudent,deleteTeacher,deleteStudent,getAdmins,getAdminById,createAdmin,deleteAdmin} from "./index.js"

const app= express();
app.use(express.json());

app.get('/teachers', async(req,res)=>{

    try{
    const teachers = await fetchTeachers();
    
    res.send(teachers);
    
    }
    catch(e){
        console.error(e);
        res.status(500).json({e: "somethin wron"})
    }
})


app.get('/teachers/:id', async(req,res)=>{
    const id= req.params.id;
    try{
    const teachers = await fetchTeacherById(id);
    
    res.send(teachers);
    
    }
    catch(e){
        console.error(e);
        res.status(500).json({e: "somethin wrong"})
    }


})


app.post('/addTeacher', async(req,res)=>{
   const {Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Created_at,Updated_at}=req.body
   const teachers= await addTeacher(Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Created_at,Updated_at);
    res.send(teachers)


})

app.delete('/teachers/:id',async(req,res)=>{
    const id = req.params.id;
    try{

    const result= await deleteTeacher(id)

    if(result.affectedRows>0)
    {
        res.status(200).json({message:"Teacher deleted sccessflly"})
    }
    else{
        res.status(404).json({error:"teacher not fonud"})
    }

   
    }catch(e){
        console.error(e);
        res.status(500).json({error:"something went wrong"});

    }

})

app.get('/students',async(req,res)=>{
        
    try{
    const students= await getStudents();
    res.send(students);
    }
    catch(e){
        console.error(e).send("somethin wrong");

    }

})

app.get('/students/:id',async(req,res)=>{

    const id = req.params.id;
    try{

    const student = await getStudentById(id)
    console.log(student);
    res.json(student);

    }
    catch(e){
        console.error(e);
        res.status(505).json({e:"sometin wwron"})
    }

})
app.post('/addStudent',async(req,res)=>{

    const{Id,Name,Username,Guardian,Emergency_Contact,Profile_Picture,Interests,Created_at,Updated_at}=req.body;

    try{
    const student= await addStudent(Id,Name,Username,Guardian,Emergency_Contact,Profile_Picture,Interests,Created_at,Updated_at)
    res.send(student)
    
}
catch(e){
    console.error(e);
    res.send("error occur").status(505);
}
})

app.delete('/students/:id',async(req,res)=>{

    const id= req.params.id;
    try{
    const result= await deleteStudent(id);
    if(result.affectedRows>0){
        res.status(200).json({message:"student deleted successfully"});
    }
    else{
        res.status(404).json({message:"user not found"});
    }

    }
    catch(e){
        console.error(e);
        res.status(500).json({error:"something wrong"});
    }
})


app.get('/admins',async(req,res)=>{

    try{
        const rows= await getAdmins();
        res.json(rows);

    }catch(e)
    {
        console.error(e);
        res.status(500).json({error:"somethin wrong"});
    }

})

app.get('/admins/:id',async(req,res)=>{

    const id= req.params.id;
    try{
    const admin= await getAdminById(id);
    res.send(admin);
}catch(e){
    console.error(e);
    res.status(505).json({error:"something wrong happend"})
}
})

app.post('/createAdmin',async(req,res)=>{

    const {Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Is_Owner,Created_at,Updated_at} = req.body;
    try{
    const admin= await createAdmin(Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Is_Owner,Created_at,Updated_at);
    res.send(admin);

    }catch(e){
        console.error(e);
        res.status(500).json({error:"something wrong"});
    }

})

app.delete('/admins/:id',async (req,res)=>{

    const id = req.params.id;
    try{
        const result= await deleteAdmin(id)
        res.status(200).json({message:"user deleted successfully"});

    }
    catch(e){
        console.error(e)
        res.status(500).json({error:"something wrong"});
    }

})


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("something bad with the server");
})

app.listen(8080 ,(req,res)=>{
    console.log("server is running at port 8080");
})

