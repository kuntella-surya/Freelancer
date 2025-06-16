import Proposal from "../models/Proposals.js";
import User from "../models/User.js";
export const PostProposal = async(req,res) =>{
try{
    const { amount, description } = req.body;
    if (!amount || !description || description.length < 10) {
      return res.status(400).json({ message: "All fields are required. Description must be at least 10 characters." });
    }

    const user = await User.findById(req.user.id);

    const newProposal = new Proposal({
      projectId: req.params.projectId,
      freelancerId: req.user.id,
      freelancerName: user.uname,
      amount,
      description,
    });

    await newProposal.save();

    res.status(201).json({ message: "Proposal submitted successfully", proposal: newProposal });
}catch(err){
  console.error("Error submitting proposal:", err);
    res.status(500).json({ message: "Internal Server Error" });
}
}