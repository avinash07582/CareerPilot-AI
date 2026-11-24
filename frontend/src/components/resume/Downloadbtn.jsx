import { FiDownload } from 'react-icons/fi'
import { useReactToPrint } from "react-to-print";
import { useCoins } from '../../../apis/user.api';

// resume derence wohe pdf jisko hme download krna hai

const Downloadbtn = ({docRef,user,setUser}) => {


const  handlePdf =  useReactToPrint({
    contentRef:docRef,
    documentTitle:"FresherAIPDF"

});

// const handleDownload = async ()=>{
//     try {
//          handlePdf()
//           const coinResponse = await useCoins({coins:10,action:"resume-builder"})
         
//                   setUser((prev)=>({
//                    ...prev,interviewCoin:coinResponse?.interviewCoin
//                   }))
        
//     } catch (error) {
//          if (error.response?.status === 403) {
//                 return alert("Not enough Interview Coins.");
//             }
//             alert(
//                 error.response?.data?.message ||
//                 "Something went wrong."
//             );
        
//     }
//     handlePdf()
// }


 const handleDownload = async () => {
        try {
            
                const coinResponse = await useCoins({ coins: 10, action: "download-pdf" })

                await handlePdf()
                setUser((prev) => ({
                    ...prev, interviewCoin: coinResponse?.interviewCoin,
                }))
            
          

        } catch (error) {
            if (error.response?.status === 403) {
                return alert("Not enough Interview Coins.");
            }
            alert(
                error.response?.data?.message ||
                "Something went wrong."
            );



        }


    }


  return (
     <button    onClick={handleDownload} className='flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs text-white'>
            <FiDownload />
            Download PDF

        </button>
  )
}

export default Downloadbtn



// phelem ab ek ats rsume jhaa user dat file krega aur phir us ats ka refrnce downlaod button de debgge
