import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";



const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  // TODO : zod, hashing password
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await UserModel.create({
      username: username,
      password: password,
    });

    if (user) {
      res.status(200).json({
        message: "User signed up",
      });
    } else {
      res.status(409).json({ message: "User already exists!" });
    }
  } catch (error) {
    console.log({ error });
    res.status(409).json({ message: "User already exists!" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ username: username });
    //todo check password
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_PASSWORD
      );
      res.json({
        token,
      });
    } else {
      res.status(403).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid Credentials" });
  }
});

app.post("/api/v1/content", userMiddleware,async (req, res) => {
  const title = req.body.title;
  const link = req.body.link;
  const type = req.body.type;
  try {
    await ContentModel.create({
      title,
      link,
      type,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });

    res.json({
      message: "Content added",
    });
  } catch (error) {
    res.json({message:"Can't add content"})
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content =await  ContentModel.find({
            userId:userId
        }).populate("userId","username")
        res.json({content})
    } catch (error) {
        res.json({message:"Cannot get content"});
    }
    
});

app.delete("/api/v1/content", userMiddleware, async(req, res) => {
    const contentId = req.body.contentId;

    try {
        await ContentModel.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        })

        res.json({
            message:"Deleted"
        })
        console.log("Deleted content", contentId)
    } catch (error) {
        res.json({
            message:"Cannot delete content"
        })
    }
});

app.post("/api/v1/brain/share", userMiddleware, async(req, res) => {
  try {
    const share = req.body.share;
    
    if(share){
      const existingLink = await LinkModel.findOne({
        //@ts-ignore
        userId:req.userId
      })
      if(existingLink){
        //@ts-ignore
        res.json({hash: existingLink.hash})
        console.log("Share existing link")
        return; 
      }
      const link = await LinkModel.create({
        //@ts-ignore
        userId: req.userId,
        hash: random(10),
      })
      res.json({
        message:link.hash
      })
      console.log("new link created")
    }
    else{
      await LinkModel.deleteOne({
        //@ts-ignore
        userId: req.userId
      })
      res.json({
        message:"Deleted the sharable link"
      })
      alert("deleted the share link")
    }

    
  } catch (error) {
    res.status(411).json({
      message: error
    })
  }
    
});

app.get("/api/v1/share/:shareLink",  async(req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash
  });

  if(!link){
    res.status(411).json({
      message: "Incorrect Input"
    })
    return ;
  }
  
  const content = await ContentModel.find({
      userId: link.userId
  })
  
  const user = await UserModel.findOne({
    _id: link.userId
  })
  if(!user){
    res.json({
      message:"User Not found"
    })
    return ;
  }

  res.json({
    username: user.username,
    content: content
  })
});

app.listen(3000);
