"use client";

interface PlanCardProps {
  name: string;
  price: string;
  features: string[];
}

export default function PlanCard({ name, price, features }: PlanCardProps) {
  return (
    <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition flex flex-col items-center">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-indigo-400 font-semibold mb-4">{price}/month</p>
      <ul className="mb-4 space-y-1">
        {features.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>
      <button className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition">
        Subscribe
      </button>
    </div>
  );
}
