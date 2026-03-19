const social = {
	"telegram": "https://t.me/Tol4ik_Volkov",
	"wechat": "",
	"vk": "https://vk.com/rich_kitten",
}

const to_write = {
    "wechat": '',
    "telegram": "https://t.me/Tol4ik_Volkov",
    "viber": '',
    "whatsapp": ''
}

let WORK_PHONE = '+7 (932) 484 - 74 - 36';

for (const id in social) {
    const link = social[id];
    const element = document.getElementById(id); 

    if (element && link) {
        element.style.cursor = "pointer";
        element.addEventListener("click", () => {
            window.open(link, "_blank");
        });
    }
}

const favorite = document.getElementById("favorite"); 
if (favorite) {
    favorite.style.cursor = "pointer";
    favorite.addEventListener("click", () => {
        document.location.href = 'favorite.html';
    });
}

if (favorite) {
        favorite.style.cursor = "pointer";
}

