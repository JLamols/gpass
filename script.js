document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const rulesContainer = document.getElementById('rules');

    const rules = [
        { text: "Rule #1: Must be at least 8 characters long.", check: (pw) => pw.length >= 8 },
        { text: "Rule #2: Must contain at least one uppercase letter.", check: (pw) => /[A-Z]/.test(pw) },
        { text: "Rule #3: Must contain at least one lowercase letter.", check: (pw) => /[a-z]/.test(pw) },
        { text: "Rule #4: Must contain at least one number.", check: (pw) => /\d/.test(pw) },
        { text: "Rule #5: Must contain at least one special character (e.g., !@#$%).", check: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
        { text: "Rule #6: The numbers must add up to 25.", check: (pw) => {
            const numbers = pw.match(/\d/g);
            if (!numbers) return false;
            return numbers.reduce((sum, num) => sum + parseInt(num), 0) === 25;
        }},
        { text: "Rule #7: Must include a month of the year.", check: (pw) => {
            const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
            return months.some(month => pw.toLowerCase().includes(month));
        }},
        { text: "Rule #8: Must include a Roman numeral.", check: (pw) => /\b(I|V|X|L|C|D|M)+\b/i.test(pw) },
        { text: "Rule #9: Must include one of our sponsors: Pepsi, Starbucks, or Google.", check: (pw) => ["Pepsi", "Starbucks", "Google"].some(sponsor => pw.includes(sponsor))},
        { text: "Rule #10: Must contain the answer to the ultimate question of life, the universe, and everything.", check: (pw) => pw.includes("42") }
    ];

    let unlockedRules = 1;

    const validatePassword = () => {
        const password = passwordInput.value;
        rulesContainer.innerHTML = '';

        let allPreviousRulesSatisfied = true;
        for (let i = 0; i < unlockedRules; i++) {
            const rule = rules[i];
            const isSatisfied = rule.check(password);

            const ruleElement = document.createElement('div');
            ruleElement.classList.add('rule');
            ruleElement.classList.add(isSatisfied ? 'satisfied' : 'unsatisfied');
            ruleElement.innerHTML = `<span class="icon">${isSatisfied ? '✅' : '❌'}</span> ${rule.text}`;
            rulesContainer.appendChild(ruleElement);

            if (!isSatisfied) {
                allPreviousRulesSatisfied = false;
            }
        }

        if (allPreviousRulesSatisfied && unlockedRules < rules.length) {
            unlockedRules++;
            const nextRule = rules[unlockedRules - 1];
            const ruleElement = document.createElement('div');
            ruleElement.classList.add('rule', 'unsatisfied');
            ruleElement.innerHTML = `<span class="icon">❌</span> ${nextRule.text}`;
            rulesContainer.appendChild(ruleElement);
        }

        if (allPreviousRulesSatisfied && unlockedRules === rules.length) {
            const allSatisfied = rules.every(rule => rule.check(password));
            if (allSatisfied) {
                const winMessage = document.createElement('div');
                winMessage.style.textAlign = 'center';
                winMessage.style.marginTop = '1rem';
                winMessage.style.fontWeight = 'bold';
                winMessage.style.color = '#4caf50';
                winMessage.textContent = '🎉 Congratulations! You have a valid password! 🎉';
                rulesContainer.appendChild(winMessage);
            }
        }
    };

    passwordInput.addEventListener('input', validatePassword);
    validatePassword(); // Initial check
});
              
