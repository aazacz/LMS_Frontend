import * as Yup from "yup";

export const coursestructureform = Yup.object().shape({
    courseName: Yup.string().required('Course Name is required'),
    package: Yup.string().required('Package is required'),
    trainingDuration: Yup.number().required('trainingDuration is required').positive(),
    hoursPerDay: Yup.number().required('hoursPerDay is required').positive(),
    price: Yup.number().required('Price is required').positive(),
    description: Yup.string().required('Description is required'),
    modules: Yup.array().of(
      Yup.object().shape({
        moduleName: Yup.string().required('Module Name is required'),
        moduleDescription: Yup.string().required('Module Description is required'),
        sessions: Yup.array().of(
          Yup.object().shape({
            sessionName: Yup.string().required('Session Name is required'),
        
           
          })
        )
      })
    )
  });