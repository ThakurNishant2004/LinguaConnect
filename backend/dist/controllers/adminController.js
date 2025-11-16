import * as adminService from "../services/adminService.js";
import { sendResponse } from "../utils/responseHandler.js";
export const getDashboardStats = async (req, res) => {
    try {
        const stats = await adminService.getDashboardStats();
        sendResponse(res, 200, "Dashboard stats fetched successfully", stats);
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        sendResponse(res, 500, "Failed to fetch dashboard stats", message);
    }
};
export const addLanguage = async (req, res) => {
    try {
        const { language } = req.body;
        const result = await adminService.addLanguage(language);
        sendResponse(res, 200, "Language added successfully", result);
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        sendResponse(res, 500, "Failed to add language", message);
    }
};
export const uploadFAQs = async (req, res) => {
    try {
        const { faqs } = req.body;
        const result = await adminService.uploadFAQs(faqs);
        sendResponse(res, 200, "FAQs uploaded successfully", result);
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        sendResponse(res, 500, "Failed to upload FAQs", message);
    }
};
export const getReports = async (req, res) => {
    try {
        const reports = await adminService.getReports();
        sendResponse(res, 200, "Reports fetched successfully", reports);
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        sendResponse(res, 500, "Failed to fetch reports", message);
    }
};
export const getLanguageUsage = async (req, res) => {
    try {
        const stats = await adminService.getLanguageUsageStats();
        sendResponse(res, 200, "Language stats fetched", stats);
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        sendResponse(res, 500, "Failed to fetch language stats", message);
    }
};
export const getWeeklyActivity = async (req, res) => {
    try {
        const stats = await adminService.getWeeklyActivityStats();
        sendResponse(res, 200, "Weekly activity fetched", stats);
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        sendResponse(res, 500, "Failed to fetch weekly activity", message);
    }
};
export const exportReports = async (req, res) => {
    try {
        const csv = await adminService.exportReportsCSV();
        res.header("Content-Type", "text/csv");
        res.attachment("reports.csv");
        res.send(csv);
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        sendResponse(res, 500, "Failed to export reports", message);
    }
};
