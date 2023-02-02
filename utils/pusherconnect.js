import Pusher from "pusher";

const pusher = new Pusher({
    app_id : "1541890",
    key : "6b2763bc8649ee85c3b3",
    secret :"872134466a10ad9ff8f6",
    cluster:"ap2"
});

export {pusher};