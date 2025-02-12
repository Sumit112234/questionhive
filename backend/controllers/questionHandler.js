import Question from "../models/questions.js";
import multer from 'multer';
import cloudinary from "../config/cloudinary.js";



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


export async function addMultipleQuestions(req, res){
    const data = req.body.questions;
   
    try {
        
        let errors = [];
        data.forEach(async(question)=>{
            try {
                
                const newQuestion = new Question(question);
                await newQuestion.save();

            } catch (e) {
                errors.push(e);
            }
        })
        res.status(200).json({
            success : true,
            error : false,
            message : "Questions added successfully!",
            errors
            
           })
    } catch (e) {
        res.status(201).json({
            success : false,
            error : true,
            message : "some internal server error occured",
            e 
           })
    }
}

async function getUrl(file) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'QuestionHive' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            reject('Failed to upload image');
          } else {
            console.log('imageUrl:', result.secure_url);
            resolve(result.secure_url);
          }
        }
      );
      stream.end(file.buffer);
    });
  }
  

  export async function addQuestion(req, res) {
    try {
      const { difficulty, category, question, subject, chapter, options, answer } = req.body;
      let imageUrl = null;
  
      console.log('file:', req.file);
      console.log('body:', req.body);
  
      if (req.file) {
        imageUrl = await getUrl(req.file); // Wait for the image URL
      }
  
      console.log('Final imageUrl:', imageUrl);
  
      if (!question && !imageUrl) {
        return res.status(400).json({ success: false, message: 'Question or Image is required' });
      }
  
      const newQuestion = new Question({
        difficulty,
        category,
        question: question || null,
        image: imageUrl,
        subject,
        chapter,
        options: JSON.parse(options),
        answer,
      });
  
      await newQuestion.save();
  
      res.status(200).json({
        success: true,
        message: 'Question added successfully!',
        question: newQuestion,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: true, message: 'Internal server error', e : error });
    }
  }
  

// export async function addQuestion(req, res){
//     const data = req.body;
   
//     try {
        
//         const newQuestion = new Question(data);
//         await newQuestion.save();

//         res.status(200).json({
//             success : true,
//             error : false,
//             message : "question added successfully!",
//             question : data
            
//            })
//     } catch (e) {
//         res.status(201).json({
//             success : false,
//             error : true,
//             message : "some internal server error occured"
//            })
//     }
// }
export async function getQuestions(req, res){

    
    const { category, subject, chapter } = req.query;
    console.log(category, subject, chapter)
    try {
        
  
   
        const filter = {};
        if (category) filter.category = category;
        if (subject) filter.subject = subject;
        if (chapter && chapter !== 'all') filter.chapter = chapter;

         const questions = await Question.find(filter);

        res.status(200).json({
            success : true,
            error : false,
            message : "Questions fetched succesfully!",
            questions 
            
           })
    } catch (e) {
        res.status(201).json({
            success : false,
            error : true,
            message : "some internal server error occured",
            e 
           })
    }
}


export async function deleteQuestion(req, res) {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Question ID is required",
            });
        }

        const deletedQuestion = await Question.findByIdAndDelete(id);

        if (!deletedQuestion) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Question not found",
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            message: "Question deleted successfully",
            deletedQuestion,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error",
            errorDetails: error.message,
        });
    }
}

export async function getChapters(req, res){

    
    const { category, subject } = req.query;
    // console.log(category, subject, chapter)
    try {
        

   
        if (!subject || !category) {
            return res.status(400).json({ error: 'Subject and Category are required' });
          }
      
        
          const chapters = await Question.aggregate([
            { $match: { subject, category } }, 
            { $group: { _id: '$chapter' } }, 
            { $project: { _id: 0, chapter: '$_id' } }, 
          ]);
      
          res.status(200).json({chapters : chapters.map(chapter => chapter.chapter)});
    } catch (e) {
        res.status(201).json({
            success : false,
            error : true,
            message : "some internal server error occured",
            e 
           })
    }
}
