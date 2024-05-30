import React from "react";
import erroricon from "/errorBoundary.webp";
import mindsatlogo from "../assets/mindsatlogo.webp"
class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        error: null,
        info: null,
        errorMessage: "",
        componentStack: ""
    };

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, info) {
        console.log("Error Boundary Caught an error", error);
        this.setState({
            error: error,
            info: info,
            errorMessage: error.message,
            componentStack: info.componentStack
        });
    }

    resetErrorBoundary = () => {
        this.setState({
            hasError: false,
            error: null,
            info: null,
            errorMessage: "",
            componentStack: ""
        });
    };

    render() {
        if (this.state.hasError) {

            const componentStackLines = this.state.componentStack
                ? this.state.componentStack.split('\n').slice(0, 2).join('\n')
                : '';
            return (
                <div className="w-full h-full p-3 flex items-center flex-col">
                    <div className="w-full mt-4 flex justify-center">

                        <img src={mindsatlogo} className="w-36" alt="" />
                    </div>
                    <div className="flex justify-center">
                        <img src={erroricon} className="w-[350px]" alt="Error icon" />

                    </div>
                    <h1 className="font-plusjakartasans font-bold text-4xl text-gray-400">Oops! Something went wrong</h1>
                    <div className="w-full h-auto   flex flex-col justify-center items-center">

                        <div className="w-full text-lg mt-3  flex justify-center text-red-700">
                            Error occurred:
                            <span className="font-bold">
                                {this.state.errorMessage || 'Error'}
                            </span>
                        </div>

                        {componentStackLines && (
                            <div className="w-full text-lg text-gray-600 mt-4 flex justify-center">
                                <p>Component Stack  : </p>
                                <p>{componentStackLines}</p>
                            </div>
                        )}
                    </div>

                    <button onClick={this.resetErrorBoundary} className="mt-4 p-2 bg-blue-500 text-white rounded">
                        Retry
                    </button>
                    
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
