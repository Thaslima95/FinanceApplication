import React from "react";
import axios from "axios";

export default {
  addIncome: async function (newRow) {
    try {
      const response = await axios.post(
        `/income/addincome`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
          },
        },
        newRow
      );

      return response;
    } catch (err) {
      return err;
    }
  },
  updateIncome: async function (id, newRow) {
    try {
      const response = await axios.put(
        `/income/updateincome/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
          },
        },
        newRow
      );

      return response;
    } catch (err) {
      return err;
    }
  },
  getTotalIncome: async function () {
    try {
      const response = await axios.get(`/income/getTotalIncomeRate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getUnpaidTotalIncome: async function () {
    try {
      const response = await axios.get(`/income/getUnpaidTotalIncomeRate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
        },
      });

      return response;
    } catch (err) {
      return err;
    }
  },
  donwloadInvoice: async function (id) {
    console.log("api download");
    try {
      const response = await axios.get(`/income/generateinvoice/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
        },
      });
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  generatereceipt: async function (id) {
    try {
      const response = await axios.get(`/income/generatereceipt/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  deleteSingleIncome: async function (id) {
    try {
      const response = await axios.put(`/income/deletesinglerecord/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  },
  getUnpaidTotalExpense: async function () {
    try {
      const response = await axios.get(`/expense/getIndirectTotalExpenseRate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  addExpense: async function (newRow) {
    try {
      const response = await axios.post(
        `/expense/addexpense`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
          },
        },
        newRow
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  updateExpense: async function (id, newRow) {
    try {
      const response = await axios.put(
        `/expense/updateexpense/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
          },
        },
        newRow
      );
      console.log(response);

      return response;
    } catch (err) {
      console.log(err);

      return err;
    }
  },
  deleteSingleExpense: async function (id) {
    try {
      const response = await axios.put(
        `/expense/deletesingleexpenserecord/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenauth")}`,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};
