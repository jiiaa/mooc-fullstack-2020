export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartExtended extends CoursePartBase {
  description: string
}

export interface CourseNormalPart extends CoursePartExtended {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}


export interface CourseSpecialPart extends CoursePartExtended {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
