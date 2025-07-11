document.addEventListener('DOMContentLoaded', () => {
    // Get references to all range input elements (sliders)
    const qT = document.getElementById('qT'); // Repetitiveness
    const qP = document.getElementById('qP'); // Predictability
    const qA = document.getElementById('qA'); // Automation Potential
    const qC = document.getElementById('qC'); // Creativity
    const qH = document.getElementById('qH'); // Human Interaction
    const qI = document.getElementById('qI'); // Intuition/Judgment

    // Get references to elements that display the current value of each slider
    const valT = document.getElementById('valT');
    const valP = document.getElementById('valP');
    const valA = document.getElementById('valA');
    const valC = document.getElementById('valC');
    const valH = document.getElementById('valH');
    const valI = document.getElementById('valI');

    // Get references to the calculate button and result display elements
    const calculateBtn = document.getElementById('calculateBtn');
    const riskScoreDisplay = document.getElementById('riskScore');
    const riskLevelDisplay = document.getElementById('riskLevel');
    const recommendationText = document.getElementById('recommendation_text'); // Now correctly referencing by ID
    const resultsSection = document.querySelector('.results-section'); // Get the results section

    // Get references to language switch buttons and the body element
    const langFaBtn = document.getElementById('lang-fa');
    const langEnBtn = document.getElementById('lang-en');
    const body = document.body;

    // Select all elements that have a 'data-lang-key' attribute for translation
    const elementsToTranslate = document.querySelectorAll('[data-lang-key]');
    const questionDescriptions = document.querySelectorAll('.question-description'); // Select all question descriptions

    // Object containing all translations for Persian (fa) and English (en)
    const translations = {
        fa: {
            title: "ارزیابی ریسک شغل در برابر هوش مصنوعی",
            main_heading: "ارزیابی ریسک شغل شما در برابر هوش مصنوعی",
            // Updated description_p1 and description_p2 with <strong> tags
            description_p1: "این ابزار به شما کمک می‌کند میزان ریسک شغل خود را در برابر جایگزینی توسط هوش مصنوعی ارزیابی کنید. به هر سوال امتیازی بین <strong>۰ تا ۱۰</strong> بدهید (۰ به معنای \"اصلاً\" و ۱۰ به معنای \"کاملاً\").",
            description_p2: "<strong>قوانین امتیازدهی سریع:</strong> اگر سوالی در مورد <strong>افزایش ریسک</strong> است، پاسخ \"بله\" یا \"بیشتر اوقات\" امتیاز بالا (۷-۱۰) و پاسخ \"خیر\" یا \"کمتر اوقات\" امتیاز پایین (۰-۳) دارد. اگر سوالی در مورد <strong>کاهش ریسک</strong> است، برعکس عمل کنید.",
            risk_increase_heading: "عوامل افزایش ریسک (AI بیشتر می‌تواند جایگزین کند):",
            q_t: "1. وظایف اصلی شغل شما شامل کارهای روتین و بر پایه قوانین مشخص است؟ (تکراری بودن)",
            q_t_desc: "مثال: وارد کردن داده، کپی/پیست کردن اطلاعات، انجام کارهای مشابه روزانه.",
            q_p: "2. بیشتر تصمیم‌گیری‌های شغلی شما بر اساس داده‌ها یا الگوهای مشخص و قابل پیش‌بینی است؟ (قابل پیش‌بینی بودن)",
            q_p_desc: "مثال: تحلیل گزارشات مالی با فرمول‌های ثابت، تأیید درخواست‌ها بر اساس چک‌لیست مشخص.",
            q_a: "3. آیا وظایف شما با دستورالعمل‌های ثابت و مشخص قابل انجام است؟ (قابلیت خودکارسازی)",
            q_a_desc: "مثال: پردازش فاکتورها، رزروهای استاندارد، پاسخ به ایمیل‌های تکراری با الگوهای مشخص.",
            risk_decrease_heading: "عوامل کاهش ریسک (AI کمتر می‌تواند جایگزین کند):",
            q_c: "4. شغل شما به خلاقیت، نوآوری و تفکر خارج از چارچوب نیاز دارد؟ (خلاقیت)",
            q_c_desc: "مثال: طراحی کمپین‌های بازاریابی جدید، نوشتن داستان‌های اصلی، حل مشکلات به روش‌های نوآورانه.",
            q_h: "5. آیا تعامل مستقیم انسانی (مانند همدلی، مذاکره پیچیده، رهبری تیم) برای شغل شما ضروری است؟ (تعامل انسانی)",
            q_h_desc: "مثال: مشاوره روانشناسی، مدیریت تیم، مذاکرات تجاری پیچیده، آموزش و مربیگری.",
            q_i: "6. آیا شغل شما نیاز به قضاوت پیچیده، شهود یا تصمیم‌گیری در شرایط مبهم دارد؟ (قضاوت و شهود)",
            q_i_desc: "مثال: تشخیص بیماری‌های نادر، تصمیم‌گیری در مورد استراتژی‌های حقوقی پیچیده، ارزیابی ریسک‌های ناشناخته.",
            calculate_button: "محاسبه ریسک",
            your_risk_score: "امتیاز ریسک شما: ",
            risk_interpretation_80_100: "🔴 ریسک بسیار بالا - اقدام فوری",
            risk_interpretation_60_79: "🟡 ریسک متوسط - ارتقای مهارت‌ها",
            risk_interpretation_40_59: "🟢 ریسک پایین - نسبتاً امن",
            risk_interpretation_0_39: "🔵 ریسک خیلی پایین - شغل محافظت‌شده",
            recommendation_80_100: "شغل شما در معرض ریسک بالای جایگزینی توسط هوش مصنوعی است. به شدت توصیه می‌شود بر روی توسعه مهارت‌های جدید و غیرقابل اتوماسیون (مانند خلاقیت، تفکر استراتژیک، هوش هیجانی و حل مسئله پیچیده) تمرکز کنید. در صورت امکان، به سمت نقش‌های جدید یا حوزه‌هایی که هوش مصنوعی مکمل انسان است، حرکت کنید.",
            recommendation_60_79: "شغل شما دارای ریسک متوسط جایگزینی توسط هوش مصنوعی است. بخش‌هایی از وظایف شما ممکن است در آینده توسط هوش مصنوعی انجام شود. توصیه می‌شود مهارت‌های خود را به‌روز کنید و یاد بگیرید چگونه با ابزارهای هوش مصنوعی کار کنید تا بهره‌وری خود را افزایش دهید. تمرکز بر مهارت‌های نرم و تخصصی‌تر کلیدی است.",
            recommendation_40_59: "شغل شما ریسک پایینی در برابر جایگزینی کامل توسط هوش مصنوعی دارد. هرچند هوش مصنوعی ممکن است برخی از وظایف تکراری را بر عهده بگیرد، اما هسته اصلی شغل شما نیاز به مهارت‌های انسانی خاص دارد. همواره به دنبال یادگیری و تطبیق با فناوری‌های جدید باشید تا موقعیت خود را تقویت کنید.",
            recommendation_0_39: "شغل شما ریسک بسیار پایینی در برابر هوش مصنوعی دارد و به شدت محافظت‌شده است. این نوع مشاغل نیاز زیادی به خلاقیت، قضاوت انسانی عمیق و تعاملات پیچیده بین فردی دارند که هوش مصنوعی هنوز قادر به انجام آن نیست. با این حال، همیشه برای یادگیری و همکاری با هوش مصنوعی در جهت بهبود کارتان آماده باشید.",
        },
        en: {
            title: "AI Job Risk Assessment",
            main_heading: "Assess Your Job's AI Risk",
            // Updated description_p1 and description_p2 with <strong> tags
            description_p1: "This tool helps you assess your job's risk of being replaced by Artificial Intelligence. Give a score between <strong>0 to 10</strong> for each question (0 meaning \"Not at all\" and 10 meaning \"Completely\").",
            description_p2: "<strong>Quick Scoring Guide:</strong> For questions related to <strong>increasing risk</strong>, 'Yes' or 'Mostly' means a high score (7-10), and 'No' or 'Rarely' means a low score (0-3). For questions related to <strong>decreasing risk</strong>, apply the reverse logic.",
            risk_increase_heading: "Risk Increasing Factors (More susceptible to AI replacement):",
            q_t: "1. Do your main job duties involve routine and rule-based tasks? (Repetitiveness)",
            q_t_desc: "Example: Data entry, copy/pasting information, performing similar tasks daily.",
            q_p: "2. Are most of your job decisions based on specific and predictable data or patterns? (Predictability)",
            q_p_desc: "Example: Analyzing financial reports with fixed formulas, approving requests based on a specific checklist.",
            q_a: "3. Can your tasks be performed using fixed and clear instructions? (Automation Potential)",
            q_a_desc: "Example: Processing invoices, standard bookings, replying to repetitive emails with predefined templates.",
            risk_decrease_heading: "Risk Decreasing Factors (Less susceptible to AI replacement):",
            q_c: "4. Does your job require creativity, innovation, and out-of-the-box thinking? (Creativity)",
            q_c_desc: "Example: Designing new marketing campaigns, writing original stories, solving problems in novel ways.",
            q_h: "5. Is direct human interaction (e.g., empathy, complex negotiation, team leadership) essential for your job? (Human Interaction)",
            q_h_desc: "Example: Psychological counseling, team management, complex business negotiations, teaching and mentoring.",
            q_i: "6. Does your job require complex judgment, intuition, or decision-making in ambiguous situations? (Judgment and Intuition)",
            q_i_desc: "Example: Diagnosing rare diseases, deciding on complex legal strategies, assessing unknown risks.",
            calculate_button: "Calculate Risk",
            your_risk_score: "Your Risk Score: ",
            risk_interpretation_80_100: "🔴 Very High Risk - Immediate Action Needed",
            risk_interpretation_60_79: "🟡 Medium Risk - Skill Enhancement Needed",
            risk_interpretation_40_59: "🟢 Low Risk - Relatively Secure",
            risk_interpretation_0_39: "🔵 Very Low Risk - Protected Job",
            recommendation_80_100: "Your job faces a very high risk of replacement by AI. It is highly recommended to focus on developing new, non-automatable skills (such as creativity, strategic thinking, emotional intelligence, and complex problem-solving). If possible, consider moving towards new roles or fields where AI complements human capabilities.",
            recommendation_60_79: "Your job has a medium risk of AI replacement. Parts of your tasks might be handled by AI in the future. It's recommended to update your skills and learn how to work with AI tools to increase your productivity. Focusing on soft skills and more specialized expertise is key.",
            recommendation_40_59: "Your job has a low risk of full replacement by AI. While AI might take over some repetitive tasks, the core of your job requires specific human skills. Always seek to learn and adapt to new technologies to strengthen your position.",
            recommendation_0_39: "Your job has a very low risk of AI replacement and is highly protected. These types of jobs heavily rely on creativity, deep human judgment, and complex interpersonal interactions that AI cannot yet perform. However, always be ready to learn and collaborate with AI to improve your work.",
        }
    };

    let currentLang = 'fa'; // Default language is Persian

    /**
     * Updates the displayed value next to a range input (slider).
     * @param {HTMLInputElement} inputElement - The range input element.
     * @param {HTMLElement} valueElement - The span element displaying the value.
     */
    function updateRangeValue(inputElement, valueElement) {
        valueElement.textContent = inputElement.value;
    }

    // Attach 'input' event listeners to all range inputs
    // This updates the displayed value as the user drags the slider
    [qT, qP, qA, qC, qH, qI].forEach(input => {
        input.addEventListener('input', (event) => {
            // The ID of the value span is 'val' + the ID of the input (e.g., 'valT' for 'qT')
            updateRangeValue(event.target, document.getElementById('val' + event.target.id.substring(1)));
        });
    });

    /**
     * Calculates the AI risk score based on the formula and updates the UI.
     */
    function calculateRisk() {
        // Get integer values from all slider inputs
        const T = parseInt(qT.value); // Repetitiveness
        const P = parseInt(qP.value); // Predictability
        const A = parseInt(qA.value); // Automation Potential
        const C = parseInt(qC.value); // Creativity
        const H = parseInt(qH.value); // Human Interaction
        const I = parseInt(qI.value); // Intuition/Judgment

        // Apply the risk assessment formula:
        // Risk Score = [(T×2) + (P×2) + (A×1.5)] - [(C×2) + (H×1.5) + (I×2)] + 50
        let riskScore = ((T * 2) + (P * 2) + (A * 1.5)) - ((C * 2) + (H * 1.5) + (I * 2)) + 50;

        // Clamp the score between 0 and 100 to ensure it stays within the defined range
        riskScore = Math.max(0, Math.min(100, riskScore));
        
        // Only update UI elements if they exist to prevent TypeError
        if (riskScoreDisplay) {
            riskScoreDisplay.textContent = riskScore.toFixed(1); // Display the score, formatted to one decimal place
        }

        let interpretationKey = '';
        let recommendationKey = '';
        let levelClass = ''; // CSS class for styling the risk level display

        // Determine the risk level, corresponding interpretation, recommendation, and CSS class
        if (riskScore >= 80) {
            interpretationKey = 'risk_interpretation_80_100';
            recommendationKey = 'recommendation_80_100';
            levelClass = 'level-red'; // Very High Risk
        } else if (riskScore >= 60) {
            interpretationKey = 'risk_interpretation_60_79';
            recommendationKey = 'recommendation_60_79';
            levelClass = 'level-yellow'; // Medium Risk
        } else if (riskScore >= 40) {
            interpretationKey = 'risk_interpretation_40_59';
            recommendationKey = 'recommendation_40_59';
            levelClass = 'level-green'; // Low Risk
        } else {
            interpretationKey = 'risk_interpretation_0_39';
            recommendationKey = 'recommendation_0_39';
            levelClass = 'level-blue'; // Very Low Risk
        }

        // Update the risk level display text and apply the appropriate CSS class
        if (riskLevelDisplay) { // Check for null
            riskLevelDisplay.textContent = translations[currentLang][interpretationKey];
            riskLevelDisplay.className = `risk-level ${levelClass}`; // Reset class and add new one
        }
        // Update the recommendation text
        if (recommendationText) { // Check for null
            recommendationText.textContent = translations[currentLang][recommendationKey];
        }

        // Show the results section after calculation
        if (resultsSection) { // Check for null
            resultsSection.classList.remove('hidden');
        }
    }

    // Attach 'click' event listener to the calculate button
    calculateBtn.addEventListener('click', calculateRisk);

    // Initial update of range values when the page loads
    // This ensures the displayed values match the default slider positions
    updateRangeValue(qT, valT);
    updateRangeValue(qP, valP);
    updateRangeValue(qA, valA);
    updateRangeValue(qC, valC);
    updateRangeValue(qH, valH);
    updateRangeValue(qI, valI);

    /**
     * Sets the language of the UI.
     * @param {string} lang - The language code ('fa' for Persian, 'en' for English).
     */
    function setLanguage(lang) {
        currentLang = lang; // Update the current language variable

        // Adjust body attributes for language and text direction
        if (lang === 'fa') {
            body.setAttribute('lang', 'fa');
            body.setAttribute('dir', 'rtl'); // Right-to-left for Persian
            body.classList.remove('en'); // Remove English specific class
            langFaBtn.classList.add('active'); // Highlight Persian button
            langEnBtn.classList.remove('active');
        } else {
            body.setAttribute('lang', 'en');
            body.setAttribute('dir', 'ltr'); // Left-to-left for English
            body.classList.add('en'); // Add English specific class for CSS font change
            langFaBtn.classList.remove('active');
            langEnBtn.classList.add('active'); // Highlight English button
        }

        // Translate all elements marked with 'data-lang-key'
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (key) {
                // For specific paragraphs that contain bold text (like descriptions), use innerHTML
                // to preserve the formatting. Otherwise, use textContent.
                if (key === 'description_p1' || key === 'description_p2') {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Translate question descriptions
        questionDescriptions.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (key && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // IMPORTANT: Do NOT call calculateRisk() here.
        // The results section should only appear after the user clicks the button.
        // The initial state of the results section is hidden.
    }

    // Add event listeners for language switch buttons
    langFaBtn.addEventListener('click', () => setLanguage('fa'));
    langEnBtn.addEventListener('click', () => setLanguage('en'));

    // Set the initial language to Persian when the page loads
    setLanguage('fa');
});
