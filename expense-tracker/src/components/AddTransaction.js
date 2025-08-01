import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function AddTransaction({ uid }) {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');

  const addTransaction = async () => {
    if (!amount || !desc) return;
    await addDoc(collection(db, "transactions"), {
      uid,
      amount: parseFloat(amount),
      description: desc,
      createdAt: Timestamp.now()
    });
    setAmount('');
    setDesc('');
  };

  return (
    <div>
      <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <button onClick={addTransaction}>Add</button>
    </div>
  );
}