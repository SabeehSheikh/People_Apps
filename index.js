import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

const pool= mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
}).promise()

 export async function fetchTeachers() 
{
    const [rows]= await pool.query("select * from people_backend.teachers");
    console.log(rows);
    return rows;
}

 export async function fetchTeacherById(id) 
{
    const [rows]= await pool.query(`
    select * 
    from people_backend.teachers
    where id= ?`
    , [id]
    );
    
    return rows;
}

 export async function addTeacher(Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Created_at,Updated_at) 
{
    const [result]= await pool.query(`
    INSERT INTO people_backend.teachers (Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Created_at,Updated_at)
     VALUES (?,?,?,?,?,?,?,?,?)
    `, [Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Created_at,Updated_at]);
   return result;
} 

export async function deleteTeacher(id){
    const [result]= await pool.query(`DELETE FROM people_backend.teachers
    where id=?
    `, [id])
    return result;
}

export async function getStudents(){
    const [rows]= await pool.query("select * from people_backend.students");
    
    return rows;

}

export async function getStudentById(id){
    const [rows]= await pool.query(`select * 
    from people_backend.students
    where id=?
    `, [id])
    return rows;
}

 export async function addStudent(Id,Name,Username,Guardian,Emergency_Contact,Profile_Picture,Interests,Created_at,Updated_at){
    const [result]= await pool.query(`
    INSERT INTO people_backend.students (Id,Name,Username,Guardian,Emergency_Contact,Profile_Picture,Interests,Created_at,Updated_at)
    VALUES (?,?,?,?,?,?,?,?,?)
    `,[Id,Name,Username,Guardian,Emergency_Contact,Profile_Picture,Interests,Created_at,Updated_at]);
    return result;

 }

 export async function deleteStudent(id)
 {
    const [reslut]= await pool.query(`delete from people_backend.students 
    where id=?
    `,[id]);
    return reslut;  
 }

 export async function getAdmins(){
    const [rows]= await pool.query("select * from people_backend.administrator");
    
    return rows;

 }
 export async function getAdminById(id){
    const [rows]= await pool.query(`select * from people_backend.administrator
    where id=?
    `, [id]);
    return rows;
 }

 export async function createAdmin(Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Is_Owner,Created_at,Updated_at){
    const [result]= await pool.query(`INSERT INTO  people_backend.administrator (Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Is_Owner,Created_at,Updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?)
   
    `,[Id,Username,Qualification,Designation,Duty_Start,Duty_End,Is_Onsite,Is_Owner,Created_at,Updated_at]);
    return result;
 }

 export async function deleteAdmin(id){

    const [result]= await pool.query(`delete from people_backend.administrator
    where id=?
    `,[id]);

    return result;
 }
 

