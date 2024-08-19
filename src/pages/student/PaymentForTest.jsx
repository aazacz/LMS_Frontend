import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
import { toast } from "react-toastify";

const PaymentForTest = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  // function loadScript(src) {
  //   try {
  //     return new Promise((resolve) => {
  //       const script = document.createElement("script");
  //       script.src = src;
  //       script.onload = () => {
  //         resolve(true);
  //       };
  //       script.onerror = () => {
  //         resolve(false);
  //       };
  //       document.body.appendChild(script);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async function displayRazorpay() {
    try {
      // creating a new order
      const result = await axiosInstanceStudent.get(
        "/api/diagnosis/prepare-payment"
      );

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      const { amount, id: order_id, currency, keyId } = result.data;

      const options = {
        key: keyId, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "MindSAT Corp.",
        description: "Payment for diagnosis test",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            order_id: order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          console.log("result came");
          const result = await axiosInstanceStudent.post(
            "/api/diagnosis/verify-payment",
            data
          );
          console.log(result);
          if (result.status === 200) {
            toast.success("Payment successful");
            navigate(`/student/diagnosistestresult`, {
              replace: true,
            });
          }
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setOpen(false);
      if (error.response?.data?.alreadyPaid) {
        navigate(`/student`, {
          replace: true,
        });
      }
      console.log(error);
    }
  }
  return (
    <div className="w-full my-[30vh] flex flex-col items-center gap-8">
      <p className="text-center text-2xl font-bold text-sky-600">
        Pay the test fee to view your results
      </p>
      <button
        className="bg-sky-600 text-white mx-auto p-2"
        onClick={() => {
          if (open) return;
          setOpen(true);
          displayRazorpay();
        }}
      >
        Pay now
      </button>
    </div>
  );
};

export default PaymentForTest;
