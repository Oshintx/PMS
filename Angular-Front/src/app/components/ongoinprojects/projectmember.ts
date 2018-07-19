export interface Projmember {
  projectID:Number,
  projectTitle:String;
  dueDate:Date;
  startDate:Date;
  note:String;
  projectmanger:String;
  members:[{
    name:String,
    projectCount:Number,

  }];
  remainingdays:Number;

}
