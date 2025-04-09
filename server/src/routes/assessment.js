"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/routes/assessment.ts (v12: explicit return after success response)
var express_1 = require("express");
var pdf_lib_1 = require("pdf-lib");
var fs = require("fs"); // <--- changed import style
var assessmentUtils_1 = require("/workspaces/itmaturity/src/utils/assessmentUtils");
var emailSender_1 = require("../../utils/emailSender"); // Corrected path
var router = (0, express_1.Router)();
// --- refactored pdf generation function ---
// (this function remains the same as the previous version)
function generateResultsPdf(results, userInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, templateBytes, pdfDoc, helveticaFont, helveticaBoldFont, pages, firstPage, _a, width, height, xMargin, currentY, lineSpacing, paragraphSpacing, titleSize, headingSize, subHeadingSize, bodySize, listIndent, hugoBlue, hugoGray, black, titleText, titleWidth, titleX, focusAreaName, actionItems, ctaHeadingSize, ctaBodySize, ctaText, ctaMaxWidth, ctaWords, ctaLine, _i, ctaWords_1, word, testLine, textWidth, pdfBytes;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    templatePath = '/workspaces/itmaturity/server/healthcheckresultstemplate.pdf';
                    if (!fs.existsSync(templatePath)) {
                        throw new Error('pdf template file not found on server.');
                    }
                    templateBytes = fs.readFileSync(templatePath);
                    return [4 /*yield*/, pdf_lib_1.PDFDocument.load(templateBytes)];
                case 1:
                    pdfDoc = _b.sent();
                    return [4 /*yield*/, pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica)];
                case 2:
                    helveticaFont = _b.sent();
                    return [4 /*yield*/, pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold)];
                case 3:
                    helveticaBoldFont = _b.sent();
                    pages = pdfDoc.getPages();
                    firstPage = pages[0];
                    _a = firstPage.getSize(), width = _a.width, height = _a.height;
                    xMargin = 72;
                    currentY = height - 120;
                    lineSpacing = 18;
                    paragraphSpacing = 28;
                    titleSize = 20;
                    headingSize = 14;
                    subHeadingSize = 12;
                    bodySize = 10;
                    listIndent = 15;
                    hugoBlue = (0, pdf_lib_1.rgb)(14 / 255, 134 / 255, 153 / 255);
                    hugoGray = (0, pdf_lib_1.rgb)(0.3, 0.3, 0.3);
                    black = (0, pdf_lib_1.rgb)(0, 0, 0);
                    titleText = 'it health check self-assessment results';
                    titleWidth = helveticaBoldFont.widthOfTextAtSize(titleText, titleSize);
                    titleX = width - xMargin - titleWidth;
                    firstPage.drawText(titleText, { x: titleX, y: currentY, size: titleSize, font: helveticaBoldFont, color: hugoBlue });
                    currentY -= paragraphSpacing * 1.2;
                    firstPage.drawText("report for: ".concat(userInfo.company.toUpperCase()), { x: xMargin, y: currentY, size: headingSize, font: helveticaBoldFont, color: black });
                    currentY -= lineSpacing;
                    firstPage.drawText('this report summarizes the results of your self-assessment. it is designed to help identify', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
                    currentY -= bodySize * 1.2;
                    firstPage.drawText('strengths and weaknesses in your IT setup across four key areas based on your responses.', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
                    currentY -= bodySize * 1.2;
                    firstPage.drawText('the recommendations provided are based on common practices for the calculated maturity level.', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
                    currentY -= paragraphSpacing;
                    firstPage.drawText('overall score', { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black });
                    currentY -= lineSpacing * 1.2;
                    firstPage.drawText("".concat(results.overallScore.toFixed(0), "%"), { x: xMargin, y: currentY, size: titleSize + 4, font: helveticaBoldFont, color: hugoBlue });
                    currentY -= paragraphSpacing * 0.8;
                    firstPage.drawText("maturity level: ".concat(results.maturityLevel), { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black });
                    currentY -= lineSpacing * 0.8;
                    firstPage.drawText("(".concat(results.maturityDescription, ")"), { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
                    currentY -= paragraphSpacing;
                    firstPage.drawText('category scores:', { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black });
                    currentY -= lineSpacing;
                    if (Array.isArray(results.categoryScores)) {
                        results.categoryScores.forEach(function (category) { var categoryDisplayName = (0, assessmentUtils_1.getCategoryName)(category.category); var formattedPercentage = category.percentage.toFixed(0); firstPage.drawText("".concat(categoryDisplayName, ": ").concat(formattedPercentage, "%"), { x: xMargin + listIndent, y: currentY, size: bodySize + 1, font: helveticaFont, color: black }); currentY -= lineSpacing * 0.9; });
                    }
                    else {
                        console.warn('categoryscores is not an array:', results.categoryScores);
                    }
                    currentY -= paragraphSpacing;
                    if (results.focusArea) {
                        focusAreaName = (0, assessmentUtils_1.getCategoryName)(results.focusArea);
                        actionItems = (0, assessmentUtils_1.getActionItems)(results.focusArea);
                        firstPage.drawText("your focus area: ".concat(focusAreaName), { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black });
                        currentY -= lineSpacing * 0.8;
                        firstPage.drawText('based on your answers, here are some practical next steps:', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
                        currentY -= lineSpacing * 1.2;
                        if (Array.isArray(actionItems)) {
                            actionItems.forEach(function (item, index) { var maxWidth = width - xMargin - xMargin; var words = item.split(' '); var line = ''; firstPage.drawText("".concat(index + 1, ". "), { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: black }); for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
                                var word = words_1[_i];
                                var testLine = line + (line ? ' ' : '') + word;
                                var textWidth = helveticaFont.widthOfTextAtSize(testLine, bodySize);
                                if (textWidth > maxWidth - listIndent) {
                                    firstPage.drawText(line, { x: xMargin + listIndent, y: currentY, size: bodySize, font: helveticaFont, color: black });
                                    currentY -= bodySize * 1.2;
                                    line = word;
                                }
                                else {
                                    line = testLine;
                                }
                            } firstPage.drawText(line, { x: xMargin + listIndent, y: currentY, size: bodySize, font: helveticaFont, color: black }); currentY -= lineSpacing; });
                        }
                        currentY -= paragraphSpacing;
                    }
                    ctaHeadingSize = bodySize + 1;
                    ctaBodySize = bodySize;
                    firstPage.drawText('ready to improve your IT health?', { x: xMargin, y: currentY, size: ctaHeadingSize, font: helveticaBoldFont, color: hugoBlue });
                    currentY -= lineSpacing * 0.9;
                    ctaText = "schedule a free consultation to discuss your results and create an action plan to start improving your business IT health by emailing hugo@hugoconnect.com or visisting our website.";
                    ctaMaxWidth = width - xMargin - xMargin;
                    ctaWords = ctaText.split(' ');
                    ctaLine = '';
                    for (_i = 0, ctaWords_1 = ctaWords; _i < ctaWords_1.length; _i++) {
                        word = ctaWords_1[_i];
                        testLine = ctaLine + (ctaLine ? ' ' : '') + word;
                        textWidth = helveticaFont.widthOfTextAtSize(testLine, ctaBodySize);
                        if (textWidth > ctaMaxWidth) {
                            firstPage.drawText(ctaLine, { x: xMargin, y: currentY, size: ctaBodySize, font: helveticaFont, color: hugoGray });
                            currentY -= ctaBodySize * 1.2;
                            ctaLine = word;
                        }
                        else {
                            ctaLine = testLine;
                        }
                    }
                    firstPage.drawText(ctaLine, { x: xMargin, y: currentY, size: ctaBodySize, font: helveticaFont, color: hugoGray });
                    return [4 /*yield*/, pdfDoc.save()];
                case 4:
                    pdfBytes = _b.sent();
                    return [2 /*return*/, Buffer.from(pdfBytes)];
            }
        });
    });
}
// --- /download-pdf route handler ---
var downloadPdfHandler = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, results, userInfo, pdfBuffer, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log('received pdf download request');
                _a = req.body, results = _a.results, userInfo = _a.userInfo;
                if (!results || !userInfo) {
                    res.status(400).json({ error: 'missing results or user info' });
                    return [2 /*return*/];
                } // Added return
                return [4 /*yield*/, generateResultsPdf(results, userInfo)];
            case 1:
                pdfBuffer = _b.sent();
                res.setHeader('content-type', 'application/pdf');
                res.setHeader('content-disposition', "attachment; filename=it-health-check-".concat(userInfo.company, ".pdf"));
                res.send(pdfBuffer);
                console.log('pdf download sent successfully');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error('error handling pdf download request:', error_1);
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// --- /submit route handler ---
var submitAssessmentHandler = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, results, userInfo, pdfBuffer, pdfFilename, mailOptions, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                console.log('received assessment submission');
                _a = req.body, results = _a.results, userInfo = _a.userInfo;
                if (!results || !userInfo || !userInfo.email) {
                    console.error('missing results, user info, or user email in submission');
                    res.status(400).json({ error: 'missing required submission data' });
                    return [2 /*return*/]; // ensure exit
                }
                return [4 /*yield*/, generateResultsPdf(results, userInfo)];
            case 1:
                pdfBuffer = _b.sent();
                pdfFilename = "it-health-check-".concat(userInfo.company, ".pdf");
                mailOptions = {
                    to: userInfo.email,
                    bcc: 'hugo@hugoconnect.com', // assuming bcc
                    subject: "Your IT Health Check Results from HUGO CONNECT: ".concat(userInfo.company),
                    text: "dear ".concat(userInfo.name, ",\n\nthank you for completing the HUGO CONNECT IT health check self-assessment.\n\nplease find your personalized results attached as a pdf.\n\nthis report outlines your current IT maturity score, category breakdowns, and provides actionable next steps based on your focus area.\n\nif you'd like to discuss these results further, feel free to schedule a free consultation by replying to this email or visiting our website.\n\nregards,\nthe HUGO CONNECT team"),
                    attachments: [{ filename: pdfFilename, content: pdfBuffer, contentType: 'application/pdf' }]
                };
                console.log("sending results pdf to ".concat(userInfo.email, " (bcc: hugo@hugoconnect.com)"));
                return [4 /*yield*/, (0, emailSender_1.sendEmail)(mailOptions)];
            case 2:
                _b.sent(); // returns promise<void>
                console.log('email sent successfully');
                res.status(200).json({ message: 'assessment submitted and email sent successfully.' });
                return [2 /*return*/]; // <--- explicitly return void after sending success response
            case 3:
                error_2 = _b.sent();
                console.error('error handling assessment submission:', error_2);
                next(error_2); // passes control, implicitly returns void
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// register routes
router.post('/download-pdf', downloadPdfHandler);
router.post('/submit', submitAssessmentHandler);
exports.default = router;
