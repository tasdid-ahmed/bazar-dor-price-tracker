   export default function Loading() {
     return (
       <div className="mx-auto w-full max-w-6xl animate-pulse space-y-6 px-4 py-8" aria-busy="true">
         <div className="h-4 w-48 rounded bg-gray-200" />
         <div className="h-40 rounded-3xl bg-gray-200/70" />
         <div className="grid gap-4 sm:grid-cols-3">
           {[0, 1, 2].map((i) => (
             <div key={i} className="h-24 rounded-2xl bg-gray-200/70" />
           ))}
         </div>
         <div className="h-80 rounded-2xl bg-gray-200/70" />
       </div>
     );
   }