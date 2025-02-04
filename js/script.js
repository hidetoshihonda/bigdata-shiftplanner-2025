document.addEventListener("DOMContentLoaded", function() {
    const holidays = {
        "2025-01-01": "元日",
        "2025-01-13": "成人の日",
        "2025-02-11": "建国記念の日",
        "2025-02-23": "天皇誕生日",
        "2025-02-24": "休日",
        "2025-03-20": "春分の日",
        "2025-04-29": "昭和の日",
        "2025-05-03": "憲法記念日",
        "2025-05-04": "みどりの日",
        "2025-05-05": "こどもの日",
        "2025-05-06": "休日",
        "2025-07-21": "海の日",
        "2025-08-11": "山の日",
        "2025-09-15": "敬老の日",
        "2025-09-23": "秋分の日",
        "2025-10-13": "スポーツの日",
        "2025-11-03": "文化の日",
        "2025-11-23": "勤労感謝の日",
        "2025-11-24": "休日"
    };

    document.getElementById("generateShift").addEventListener("mousedown", function() {
    this.style.transform = "scale(0.95)";
});
document.getElementById("generateShift").addEventListener("mouseup", function() {
    this.style.transform = "scale(1)";
});

    document.getElementById("generateShift").addEventListener("click", generateShift);

    function generateShift() {
        const shiftMonth = document.getElementById("shiftMonth").value;
        if (!shiftMonth) {
            alert("シフト作成月を選択してください。");
            return;
        }

        const year = shiftMonth.split("-")[0];
        const month = shiftMonth.split("-")[1];
        const daysInMonth = new Date(year, month, 0).getDate();

        const teamSizes = {
            integration: parseInt(document.getElementById("integration").value, 10),
            hdiSpark: parseInt(document.getElementById("hdi-spark").value, 10),
            synapse: parseInt(document.getElementById("synapse").value, 10)
        };

        const totalMembers = teamSizes.integration + teamSizes.hdiSpark + teamSizes.synapse;
        const teamRatios = {
            integration: (teamSizes.integration / totalMembers).toFixed(2),
            hdiSpark: (teamSizes.hdiSpark / totalMembers).toFixed(2),
            synapse: (teamSizes.synapse / totalMembers).toFixed(2)
        };

        document.getElementById("teamAssignment").innerHTML = `
            <p>Integration: ${teamRatios.integration * 100}%</p>
            <p>HDI/Spark: ${teamRatios.hdiSpark * 100}%</p>
            <p>Synapse: ${teamRatios.synapse * 100}%</p>
        `;

        let weekdays = 0, weekendHolidays = 0;

for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dateString = `${year}-${month.padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isHoliday = holidays[dateString] !== undefined;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    if (isWeekend || isHoliday) {
        weekendHolidays++;
    } else {
        weekdays++;
    }
}






document.getElementById("monthInfo").innerHTML = `
    <table border="1" style="margin: 20px auto;">
        <tr><th>選択した月</th><th>平日合計</th><th>休日合計</th><th>総日数</th></tr>
        <tr>
            <td>${year}年${month}月</td>
            <td>${weekdays}日</td>
            <td>${weekendHolidays}日</td>
            <td>${daysInMonth}日</td>
        </tr>
    </table>
`;

const teamAssignments = {
    integration: {
        weekdays: parseFloat((weekdays * teamRatios.integration).toFixed(2)),
        weekends: parseFloat((weekendHolidays * teamRatios.integration).toFixed(2))
    },
    hdiSpark: {
        weekdays: parseFloat((weekdays * teamRatios.hdiSpark).toFixed(2)),
        weekends: parseFloat((weekendHolidays * teamRatios.hdiSpark).toFixed(2))
    },
    synapse: {
        weekdays: parseFloat((weekdays * teamRatios.synapse).toFixed(2)),
        weekends: parseFloat((weekendHolidays * teamRatios.synapse).toFixed(2))
    }
};

// UI で値をユーザーが編集できるようにする
function updateTotals() {
    let totalWeekdays = 0;
    let totalWeekends = 0;
    let totalRatio = 0;

    document.querySelectorAll(".ratio-input").forEach(input => {
        totalRatio += parseFloat(input.value) || 0;
    });
    document.querySelectorAll(".weekdays-input").forEach(input => {
        totalWeekdays += parseFloat(input.value) || 0;
    });
    document.querySelectorAll(".weekends-input").forEach(input => {
        totalWeekends += parseFloat(input.value) || 0;
    });

    document.getElementById("totalRatio").innerHTML = `<strong>${totalRatio.toFixed(2)}%</strong>`;
    document.getElementById("totalWeekdays").innerHTML = `<strong>${totalWeekdays.toFixed(2)}</strong>`;
    document.getElementById("totalWeekends").innerHTML = `<strong>${totalWeekends.toFixed(2)}</strong>`;
}
document.getElementById("teamAssignment").innerHTML = `
<table border="1" style="margin: 20px auto;">
    <thead>
        <tr><th>チーム</th><th>割合</th><th>平日担当日数</th><th>土日祝担当日数</th></tr>
    </thead>
    <tbody>
        <tr>
            <td>Integration</td>
            <td><input type="number" class="ratio-input" value="${(teamRatios.integration * 100).toFixed(2)}"></td>
            <td><input type="number" class="weekdays-input" value="${teamAssignments.integration.weekdays}"></td>
            <td><input type="number" class="weekends-input" value="${teamAssignments.integration.weekends}"></td>
        </tr>
        <tr>
            <td>HDI/Spark</td>
            <td><input type="number" class="ratio-input" value="${(teamRatios.hdiSpark * 100).toFixed(2)}"></td>
            <td><input type="number" class="weekdays-input" value="${teamAssignments.hdiSpark.weekdays}"></td>
            <td><input type="number" class="weekends-input" value="${teamAssignments.hdiSpark.weekends}"></td>
        </tr>
        <tr>
            <td>Synapse</td>
            <td><input type="number" class="ratio-input" value="${(teamRatios.synapse * 100).toFixed(2)}"></td>
            <td><input type="number" class="weekdays-input" value="${teamAssignments.synapse.weekdays}"></td>
            <td><input type="number" class="weekends-input" value="${teamAssignments.synapse.weekends}"></td>
        </tr>
    </tbody>
</table>
`;




const shiftTable = document.getElementById("shiftTable").getElementsByTagName("tbody")[0];
shiftTable.innerHTML = "";

const teamOptions = ["-", "Integration", "HDI/Spark", "Synapse"];
const teamColors = {
    "Integration": "#ffcccc",
    "HDI/Spark": "#ccffcc",
    "Synapse": "#cce5ff"
};

for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dateString = `${year}-${month.padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isHoliday = holidays[dateString] !== undefined;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    const row = shiftTable.insertRow();
    const dateCell = row.insertCell(0);
    const dayCell = row.insertCell(1);
    const teamCell = row.insertCell(2);
    const integrationCell = row.insertCell(3);
    const hdiSparkCell = row.insertCell(4);
    const synapseCell = row.insertCell(5);

    dateCell.textContent = dateString;
    dayCell.textContent = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];

    const select = document.createElement("select");
    select.classList.add("modern-dropdown");
    teamOptions.forEach(team => {
        const option = document.createElement("option");
        option.value = team;
        option.textContent = team;
        select.appendChild(option);
    });
    teamCell.appendChild(select);

    select.addEventListener("change", function() {
        const selectedTeam = select.value;
        const defaultBgColor = isHoliday ? "#FF6347" : isWeekend ? "#FFD700" : "white";
        [integrationCell, hdiSparkCell, synapseCell].forEach(cell => {
            const teamName = cell.cellIndex === 3 ? "Integration" : cell.cellIndex === 4 ? "HDI/Spark" : "Synapse";
            if (selectedTeam === "-") {
                cell.style.backgroundColor = defaultBgColor;
                cell.textContent = "";
            } else if (selectedTeam === teamName) {
                cell.style.backgroundColor = "white";
                cell.textContent = "N/A";
            } else {
                cell.style.backgroundColor = teamColors[teamName];
                cell.textContent = "";
            }
        });
    });

    if (isWeekend) {
        row.style.backgroundColor = "#FFD700"; // 黄色で土日を強調
    }
    if (isHoliday) {
        row.style.backgroundColor = "#FF6347"; // 赤で祝日を強調
    }
}


// CSS スタイルを適用
const style = document.createElement("style");
style.innerHTML = `
    .modern-dropdown {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .modern-dropdown:hover {
        border-color: #007bff;
    }
    .modern-dropdown:focus {
        outline: none;
        border-color: #0056b3;
        box-shadow: 0 0 5px rgba(0, 91, 187, 0.5);
    }
`;
document.head.appendChild(style);

// Save ボタンを追加
const saveButton = document.createElement("button");
saveButton.textContent = "Save";
saveButton.id = "saveShift";
saveButton.style.margin = "20px";
saveButton.style.padding = "10px 20px";
saveButton.style.fontSize = "16px";
saveButton.style.cursor = "pointer";
saveButton.style.border = "1px solid #007bff";
saveButton.style.borderRadius = "5px";
saveButton.style.backgroundColor = "#007bff";
saveButton.style.color = "white";

document.body.appendChild(saveButton);

// Back ボタンを追加
const backButton = document.createElement("button");
backButton.textContent = "Back";
backButton.id = "backShift";
backButton.style.margin = "20px";
backButton.style.padding = "10px 20px";
backButton.style.fontSize = "16px";
backButton.style.cursor = "pointer";
backButton.style.border = "1px solid #dc3545";
backButton.style.borderRadius = "5px";
backButton.style.backgroundColor = "#dc3545";
backButton.style.color = "white";
backButton.disabled = true; // 初期状態では無効化

document.body.appendChild(backButton);

// Save前のデータを保存するための変数
let originalState = [];

// Save ボタンの動作
document.getElementById("saveShift").addEventListener("click", function() {
    const shiftTable = document.getElementById("shiftTable").getElementsByTagName("tbody")[0];
    const rows = shiftTable.getElementsByTagName("tr");

    // Save前の状態を保存
    originalState = [];

    for (let i = 0; i < rows.length; i++) {
        const teamCell = rows[i].cells[2]; // LateShift 列
        const select = teamCell.querySelector("select");

        if (select) {
            const selectedTeam = select.value;

            // 元の選択状態を保存
            originalState.push({
                rowIndex: i,
                team: selectedTeam
            });

            teamCell.setAttribute("data-original", selectedTeam); // 元の選択を保存
            teamCell.textContent = selectedTeam; // ドロップダウンを文字列に変換
            teamCell.style.backgroundColor = teamColors[selectedTeam] || "white"; // 背景色を適用
        }
    }

    backButton.disabled = false; // Back ボタンを有効化
    alert("シフトを保存しました！");
});

function setupDropdownEvents(select, isHoliday, isWeekend, integrationCell, hdiSparkCell, synapseCell) {
    select.addEventListener("change", function() {
        const selectedTeam = select.value;
        const defaultBgColor = isHoliday ? "#FF6347" : isWeekend ? "#FFD700" : "white";

        [integrationCell, hdiSparkCell, synapseCell].forEach(cell => {
            const teamName = cell.cellIndex === 3 ? "Integration" : cell.cellIndex === 4 ? "HDI/Spark" : "Synapse";
            if (selectedTeam === "-") {
                cell.style.backgroundColor = defaultBgColor;
                cell.textContent = "";
            } else if (selectedTeam === teamName) {
                cell.style.backgroundColor = "white";
                cell.textContent = "N/A";
            } else {
                cell.style.backgroundColor = teamColors[teamName];
                cell.textContent = "";
            }
        });
    });
}

document.getElementById("backShift").addEventListener("click", function() {
    if (originalState.length === 0) return;

    const shiftTable = document.getElementById("shiftTable").getElementsByTagName("tbody")[0];
    const rows = shiftTable.getElementsByTagName("tr");

    for (let i = 0; i < originalState.length; i++) {
        const { rowIndex, team } = originalState[i];
        const row = rows[rowIndex];
        const teamCell = row.cells[2]; // LateShift 列

        // 各セルを取得（LateShiftの影響を受けるセル）
        const integrationCell = row.cells[3];
        const hdiSparkCell = row.cells[4];
        const synapseCell = row.cells[5];

        // 休日・週末判定
        const dateText = row.cells[0].textContent; // "2025-02-01" のような日付を取得
        const date = new Date(dateText);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isHoliday = holidays[dateText] !== undefined;

        // ドロップダウンを復元
        const select = document.createElement("select");
        select.classList.add("modern-dropdown");

        teamOptions.forEach(optionValue => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            if (optionValue === team) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        // イベントリスナーを再登録
        setupDropdownEvents(select, isHoliday, isWeekend, integrationCell, hdiSparkCell, synapseCell);

        // セルの内容をドロップダウンに戻す
        teamCell.innerHTML = "";
        teamCell.appendChild(select);
        teamCell.style.backgroundColor = "white"; // 元の背景色に戻す
    }

    // 戻したのでBackボタンは無効化
    backButton.disabled = true;
    alert("シフトを元に戻しました！");
});


    }
});
