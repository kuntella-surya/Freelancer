import Proposal from "../models/Proposals.js";
export const getProposals= async(req,res)=>{
try {
    const proposals = await Proposal.find({ projectId: req.params.projectId }).sort({ createdAt: -1 });
    res.json({ proposals });
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({ message: "Failed to fetch proposals" });
  }
}