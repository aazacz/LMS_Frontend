import  React from "react"
import { IoArrowBackCircleOutline } from "react-icons/io5"


const ViewModal =({Data,setModal})=>{


return(


<div className="absolute inset-0 bg-white p-6 z-[9] overflow-auto">
          

          <IoArrowBackCircleOutline className="text-4xl mb-4"  onClick={() => setModal(false)}/>
          {Data?.map((item) => (
  <div key={item._id} className="bg-white   mb-6">
    <h2 className="text-2xl font-bold mb-4 text-blue-900">{item.title}</h2>
    <div className="mb-4 flex justify-between">
      <div>
        <strong className="text-gray-700">Marks: </strong>
        <span className="text-green-700">+{item.positiveMark}</span>
        <span className="text-red-700"> / -{item.negativeMark}</span>
      </div>
      <div>
        <strong className="text-gray-700">Time Slot: </strong>
        <span className="text-blue-700">{item.timeSlot} min</span>
      </div>
    </div>
    <div className="mb-4 flex justify-between">
      <div>
        <strong className="text-gray-700">Total Questions: </strong>
        <span className="text-blue-700">{item.questions.length}</span>
      </div>
      <div>
        <strong className="text-gray-700">Status: </strong>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {item.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>

    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Choices</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correct</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {item.questions.map((question) => (
          <tr key={question._id} className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap">{question.question}</td>
            <td className="px-4 py-4 whitespace-nowrap">
              {question.choices.map((choice) => (
                <div key={choice._id} className={`${choice.isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {choice.choiceText}
                  <br />
                  <span className="text-xs text-gray-500">{choice.whyIsIncorrect}</span>
                </div>
              ))}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              {question.choices.find((choice) => choice.isCorrect)?.choiceText || 'None'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
))}


        </div> 


)
}

export default ViewModal 