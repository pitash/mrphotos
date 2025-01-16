

async function fetchItem(id) {
  const response = await fetch(`${process.env.baseUrl}/search/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    cache: "no-store", // Ensures fresh data for each request
  });

  if (!response.ok) {
    throw new Error("Failed to fetch item");
  }

  return response.json();
}

// Predefine static params
export async function generateStaticParams() {
  // Replace this with actual static IDs or fetch from an API
  const staticIds = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
    '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75',
    '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
    '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104',
    '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117',
    '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130',
    '131', '132', '133', '134', '135', '136', '137', '138', '139', '140'
  ];
   // Example static IDs

  // Ensure the array returns objects with id keys
  return staticIds.map((id) => ({ id }));
}

export default async function SearchDetail({ params }) {
  const { id } = params;

  let item;
  try {
    item = await fetchItem(id);
  } catch (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message || "Failed to load data"}
      </div>
    );
  }

  if (!item) {
    return <div className="text-center mt-10">No result found!</div>;
  }

  return (
    <div className="relative min-h-screen px-5 pb-48 md:pb-32 md:px-20 pt-32 bg-gray-100">
      {/* Side text - similar to "Last Works" */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
          Searching Result
        </span>
      </div>

      {/* Main Content */}
      <div className="p-6 animate-fade-in">
        <h1 className="text-3xl font-bold">{item.title || "Untitled"}</h1>
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title || "Gallery Image"}
            className="w-full h-[400px] object-cover mt-4 rounded-md shadow-lg"
          />
        )}
        <p className="mt-4 text-lg">{item.description || "No description available."}</p>
      </div>
    </div>
  );
}


// In your [id].js file:

// async function fetchItem(id) {
//   const response = await fetch(`${process.env.baseUrl}/search/${id}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id }),
//     cache: "no-store", // Ensures fresh data for each request
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch item");
//   }

//   return response.json();
// }

// // Generate static params dynamically (example)
// export async function generateStaticParams() {
//   const response = await fetch(`${process.env.baseUrl}/all-items-ids`);
//   const ids = await response.json();

//   return ids.map((id) => ({ id: String(id) }));
// }

// export default async function SearchDetail({ params }) {
//   const { id } = params;

//   let item;
//   try {
//     item = await fetchItem(id);
//   } catch (error) {
//     return (
//       <div className="text-red-500 text-center mt-10">
//         Error: {error.message || "Failed to load data"}
//       </div>
//     );
//   }

//   if (!item) {
//     return <div className="text-center mt-10">No result found!</div>;
//   }

//   return (
//     <div className="relative min-h-screen px-5 pb-48 md:pb-32 md:px-20 pt-32 bg-gray-100">
//       <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
//         <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
//           Searching Result
//         </span>
//       </div>

//       <div className="p-6 animate-fade-in">
//         <h1 className="text-3xl font-bold">{item.title || "Untitled"}</h1>
//         {item.image_url && (
//           <img
//             src={item.image_url}
//             alt={item.title || "Gallery Image"}
//             className="w-full h-[400px] object-cover mt-4 rounded-md shadow-lg"
//           />
//         )}
//         <p className="mt-4 text-lg">{item.description || "No description available."}</p>
//       </div>
//     </div>
//   );
// }
