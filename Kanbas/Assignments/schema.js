import mongoose from "mongoose";
const schema = new mongoose.Schema(
 {
   title: String,
   description:String,
   course: { type: String, required: true },  
   points:Number,
   assignmentGroup:String,
   displayGradeAs:String,
   submissionType:String,
   dueDate: Date,
   availableDate: Date,
   
 },
 { collection: "assignments" }
);
schema.virtual("formattedDueDate").get(function () {
    if (this.dueDate) {
      return this.dueDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      });
    }
    return null;
  });
  
  schema.virtual("formattedAvailableDate").get(function () {
    if (this.availableDate) {
      return this.availableDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      });
    }
    return null;
  });
  
export default schema;