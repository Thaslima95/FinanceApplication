import React from "react";
import axios from "axios";

export default {
  // addIncome: async function (newRow) {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8089/income/addincome`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
  //         },
  //         data: newRow,
  //       }
  //     );

  //     return response;
  //   } catch (err) {
  //     return err;
  //   }
  // },

  getTotalIncome: async function () {
    try {
      const response = await axios.get(
        `http://localhost:8089/income/getTotalIncomeRate`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
          },
        }
      );
      return response;
    } catch (err) {
      return err;
    }
  },
  getUnpaidTotalIncome: async function () {
    try {
      const response = await axios.get(
        `http://localhost:8089/income/getUnpaidTotalIncomeRate`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
          },
        }
      );

      return response;
    } catch (err) {
      return err;
    }
  },

  getTotalExpense: async function () {
    try {
      const response = await axios.get(`/expense/getDirectTotalExpenseRate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
        },
      });
      return response;
    } catch (err) {
      return err;
    }
  },
  getUnpaidTotalExpense: async function () {
    try {
      const response = await axios.get(
        `http://localhost:8089/expense/getIndirectTotalExpenseRate`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
          },
        }
      );
      return response;
    } catch (err) {
      return err;
    }
  },
};
