import React from "react";
import styles from './Card.module.scss'
// eslint-disable-next-line no-unused-vars
const Card = (card) => {


  return (

    <div className={styles.card}>

     <table className={styles.trr}>
         <tr >
             <td className={styles.tdd}>
             Requested Amount : 
             </td>
             <td className={styles.tdd}>
             {card.amount}
             </td>
         </tr>
         <tr className={styles.trr}>
             <td className={styles.tdd}>
             UPI ID : 
             </td>
             <td className={styles.tdd}>
             {card.upiId}
             </td>
         </tr>
         <tr className={styles.trr}>
             <td className={styles.tdd}>
             Reason : 
             </td>
             <td className={styles.tdd}>
             {card.reason}
             </td>
         </tr>
         <tr className={styles.trr}>
             <td>
             Duration : 
             </td>
             <td>
             {card.duration}
             </td>
         </tr>
     </table>




      {/* <div className={styles.cardTitle}></div>
      <div className={styles.cardTitle}></div>
      <div className={styles.cardTitle}></div>
      <div className={styles.cardTitle}></div> */}
    </div>

  );
};

export default Card;