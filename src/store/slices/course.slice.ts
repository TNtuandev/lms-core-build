import { create } from "zustand";
import { IModule } from "@/hooks/queries/course/useModuleCourse";
import { immer } from "zustand/middleware/immer";

interface CourseState {
  lesson: any;
  module: IModule | null;
  setLesson: (lesson: any) => void;
  setModule: (module: IModule) => void;
}

export const useCourseStore = create<CourseState>()(
  (set) => ({
    lesson: null,
    module: null,
    setLesson: (lesson) => set({ lesson }),

    setModule: (module) => set({ module }),
  }),
);
