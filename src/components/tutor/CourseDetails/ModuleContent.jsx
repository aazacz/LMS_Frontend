const ModuleContent = ({ modules }) => {
  return (
    <div>
      {modules?.map((module, index) => (
        <div key={index} className="font-poppins">
          <p className="font-semibold">{module.moduleName}</p>
          <h6 className="ml-[2%]">{module.moduleDescription}</h6>
        </div>
      ))}
    </div>
  );
};

export default ModuleContent;
