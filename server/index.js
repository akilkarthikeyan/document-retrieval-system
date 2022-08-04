const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
const util = require('util')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "documentretrievalsystem",
    port: 3306
});

db.connect((err)=>{
    if (err) {
        console.log("Error occured", err)
    }
    else {
        console.log("Connection successful")
    }
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', (req, res)=>{
    res.send("Homepage old new")
})



app.post('/getPapers', (req, res)=>{
    const searchfieldTitle = req.body.Title;
    const searchfieldAuthor = req.body.Author;
    const searchfieldFromDate = req.body.FromDate;
    const searchfieldToDate = req.body.ToDate;

    let conditionArray = [];
    
    if(searchfieldTitle.length)
        conditionArray.push(` title like '%${searchfieldTitle}%' `);
    
    if(searchfieldAuthor.length){
        conditionArray.push(`( concat(first_name, middle_name, last_name) like '%${searchfieldAuthor}%' or
        concat(first_name, last_name, middle_name) like '%${searchfieldAuthor}%' )`);
    }

    if(searchfieldFromDate.length)
        conditionArray.push(` year(date_of_publication) >= ${searchfieldFromDate} `);

    if(searchfieldToDate.length)
        conditionArray.push(` year(date_of_publication) <= ${searchfieldToDate} `);
    
    let condition = conditionArray.join(` and `)
    const qry =  `select title, pa.doi, first_name, last_name from publishes pu 
                 join papers pa on (pu.doi = pa.doi) join authors au on (au.author_id = pu.author_id)
                    where ` + condition +  `;`;

    

    db.query(qry, (err,result) => {
        let infoHash = new Map();
        for(let i in result){
            let key = result[i];
            const name = key.first_name +" "+ key.last_name;
            if(infoHash.has(key.doi)){
                infoHash.get(key.doi).authors.push(name);
            }
            else{
                let obj = {
                    title : key.title,
                    authors : [name]
                }
                infoHash.set(key.doi,obj);

            }
        }
        let opArray = [];
        infoHash.forEach((values,keys) =>{
            opArray.push({
                doi : keys,
                title : values.title,
                authors : values.authors
            });
        })
        res.send(opArray)
    
    })
    
})



app.post('/getPaperDetails', (req, res)=>{
    const doi = req.body.doi;
    //DATE_FORMAT("2017-06-15", "%M %d %Y")
    const papersQry = `select doi, volume, title, DATE_FORMAT(date_of_publication, "%M %d %Y") date_of_publication, citations, paper_type from papers where doi = '${doi}'`;

    const authorsQry = `select  a.author_id, suffix, first_name, middle_name, last_name, Hindex, research_affiliation from publishes p, authors a where p.author_id = a.author_id and doi = '${doi}'`;

    const confDetailsQry = `select conference_name, conference_type, venue from conference where doi = '${doi}'`;

    const jourDetailsQry = `select journal_name, issue, journal_type from journal where doi = '${doi}'`;

    papersQryPromise = () =>{
        return new Promise((resolve, reject)=>{
            db.query(papersQry,  (err, result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            });
        });
    };

    authorsQryPromise = () =>{
        return new Promise((resolve, reject)=>{
            db.query(authorsQry,  (err, result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            });
        });
    };

    confDetailsQryPromise = () =>{
        return new Promise((resolve, reject)=>{
            db.query(confDetailsQry,  (err, result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            });
        });
    };

    jourDetailsQryPromise = () =>{
        return new Promise((resolve, reject)=>{
            db.query(jourDetailsQry,  (err, result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            });
        });
    };
   
    async function sendOutput(){
        try{
            const papersResult = await papersQryPromise();
            const authorsResult = await authorsQryPromise();
            if(papersResult.length && authorsResult.length){
                let op = papersResult[0];
                op["authorsDetails"] = authorsResult;
                if(op.paper_type === 'conference'){
                    const confDetailsResult = await confDetailsQryPromise();
                    op = {...op, ...confDetailsResult[0]};
                }
                else if(op.paper_type === 'journal'){
                    const jourDetailsResult = await jourDetailsQryPromise();
                    op = {...op, ...jourDetailsResult[0]};
                }
                else{

                }
                res.send(op);
            }
            else{
                res.send({});
            }
        }
        catch(err){
            console.log(err);
            res.send({});
        }
    }

    sendOutput();
})

app.post('/insertAuthor', (req, res) => { 
    const authorId = req.body.authorId;
    const suffix = req.body.suffix;
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const hIndex = req.body.hIndex;
    const rAffiliation = req.body.rAffiliation;

    const qry = `insert into authors values('${authorId}', '${suffix}', '${firstName}', '${middleName}', '${lastName}', ${hIndex}, '${rAffiliation}')`;
    db.query(qry,  (err, result) => {
        if(err){
            res.send(true);
        }
        else res.send(false);
    });
})

app.post('/insertJournal', (req, res) => { 
    const doi = req.body.doi;
    const name = req.body.name;
    const issue = req.body.issue;
    const journalType = req.body.journalType;

    const qry = `insert into journal values('${doi}', '${name}', ${issue}, '${journalType}')`;
    db.query(qry,  (err, result) => {
        if(err){
            res.send(true);
        }
        else res.send(false);
    });
})

app.post('/insertConference', (req, res) => { 
    const doi = req.body.doi;
    const confName = req.body.confName;
    const confType = req.body.confType;
    const venue = req.body.venue;

    const qry = `insert into conference values('${doi}', '${confName}', '${confType}', '${venue}')`;
    db.query(qry,  (err, result) => {
        if(err){
            res.send(true);
            console.log(err);
        }
        else res.send(false);
    });
})

app.post('/insertPaper', (req, res) => { 
    const doi = req.body.doi;
    const volume = req.body.volume;
    const title = req.body.title;
    const dateOfPublication = req.body.dateOfPublication;
    const citations = req.body.citations;
    const paperType = req.body.paperType;
    const authors = req.body.authors;

    const papersQry = `insert into papers values('${doi}', '${volume}', '${title}', '${dateOfPublication}', '${citations}', '${paperType}')`;
    
    let publishesQry = `insert into publishes values`;

    for(let i = 0; i < authors.length; i++) {
        if(i != 0)
            publishesQry += `,`;
        publishesQry += `('${authors[i]}', '${doi}', ${i+1})`;
    }

    const delQry = `delete from papers where doi = '${doi}'`;



    db.query(papersQry,  (err, result)=>{
        if(err){
            res.send(true);
        }
        else {
            db.query(publishesQry,  (err, result)=>{
                if(err){
                    db.query(delQry,  (err, result) => {

                    });
                    res.send(true);
                }
                else res.send(false);
            });
        }
    });

    
})
  
app.listen(3001, ()=>{
    console.log("running on port 3001")
})