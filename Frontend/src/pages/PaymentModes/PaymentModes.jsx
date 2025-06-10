import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentModes() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [jazzCashNumber, setJazzCashNumber] = useState("");
  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvv: "" });
  const [processing, setProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [paidMessage, setPaidMessage] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};

  const simulateProcessing = async () => {
    if (!orderId) {
      alert("Missing order ID. Cannot proceed with payment.");
      return;
    }

    setProcessing(true);
    let timer = 10;

    const interval = setInterval(() => {
      timer -= 1;
      setTimeLeft(timer);
    }, 1000);

    setTimeout(async () => {
      clearInterval(interval);

      let paymentDetails = {};
      if (paymentMethod === "jazzcash") {
        paymentDetails = { jazzCashNumber };
      } else if (paymentMethod === "debitcard") {
        const { number, expiry, cvv } = cardInfo;
        paymentDetails = {
          cardLast4Digits: number.slice(-4),
          expiry,
          cardType: "Visa"
        };
      }

      try {
        await axios.post("https://food-del-backend-zeta.vercel.app/api/order/payment-mode", {
          orderId,
          paymentMode: paymentMethod,
        });

        await axios.post("https://food-del-backend-zeta.vercel.app/api/order/payment-details", {
          orderId,
          paymentDetails,
        });

        await axios.post("https://food-del-backend-zeta.vercel.app/api/order/status", {
          orderId,
          status: "Paid",
        });

        setProcessing(false);
        setPaidMessage(true);

        setTimeout(() => {
          navigate("/myorders");
        }, 2000);

      } catch (error) {
        console.error("Payment failed", error);
        alert("Payment failed, please try again.");
        setProcessing(false);
      }
    }, 10000);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      return alert("Please select a payment method");
    }

    if (paymentMethod === "jazzcash" && !jazzCashNumber) {
      return alert("Please enter your JazzCash number");
    }

    if (paymentMethod === "debitcard") {
      const { number, expiry, cvv } = cardInfo;
      if (!number || !expiry || !cvv) {
        return alert("Please complete your card details");
      }
    }

    simulateProcessing();
  };

  return (
    <div className="pt-16">
      <div className="p-10 max-w-md mx-auto bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Select Payment Mode</h2>

        <div className="space-y-3">
          <label>
            <input
              type="radio"
              value="jazzcash"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === "jazzcash"}
              className="mr-2"
            />
            JazzCash
          </label>
          {paymentMethod === "jazzcash" && (
            <input
              type="text"
              className="border p-2 w-full rounded"
              placeholder="JazzCash Number"
              value={jazzCashNumber}
              onChange={(e) => setJazzCashNumber(e.target.value)}
            />
          )}

          <label>
            <input
              type="radio"
              value="debitcard"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === "debitcard"}
              className="mr-2"
            />
            Debit/Credit Card
          </label>
          {paymentMethod === "debitcard" && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Card Number"
                className="border p-2 w-full rounded"
                value={cardInfo.number}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, number: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="border p-2 w-full rounded"
                value={cardInfo.expiry}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, expiry: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="CVV"
                className="border p-2 w-full rounded"
                value={cardInfo.cvv}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, cvv: e.target.value })
                }
              />
            </div>
          )}

          <label>
            <input
              type="radio"
              value="cod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === "cod"}
              className="mr-2"
            />
            Cash on Delivery
          </label>
        </div>

        {/* Spinner & Success Message Section */}
        {processing ? (
          <div className="flex flex-col items-center mt-6">
            <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-sm text-gray-600">Processing... {timeLeft}s</p>
          </div>
        ) : paidMessage ? (
          <p className="mt-6 text-green-600 font-semibold text-center">✅ Bill Paid! Redirecting...</p>
        ) : (
          <button
            onClick={handlePayment}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
          >
            Proceed with Payment
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentModes;
