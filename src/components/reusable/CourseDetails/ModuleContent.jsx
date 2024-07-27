import { useEffect, useState } from "react"

const ModuleContent = ({ Course }) => {
    const [modules, setModules] = useState([])
    console.log('course')

    useEffect(() => {
        if (Course && Course.modules) {
            setModules(Course.modules)
        }
    }, [Course])

    return (
        <div className="bg-green-300 w-full h-full border-2">
            <h1>Modules</h1>
            {modules.map((module, index) => (
                <div key={index}>{module.moduleName}</div>
            ))}
        </div>
    )
}

export default ModuleContent