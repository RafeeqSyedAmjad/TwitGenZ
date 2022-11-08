import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import dynamic from 'next/dynamic';
import { db, storage } from "../firebase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import {useSession} from 'next-auth/react';




function Input() {
    const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const {data:session} = useSession();

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            username: session.user.name,
            userImg: session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),
        });


        // image Url 
        const imageRef = ref(storage, `posts/${docRef.id}/image`);


        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                // Getting the firebase image url after uploading it to firebase storage
                // storing it in a varable and updating my document that we created inside of a posts
                // and then we are updting image with the variable
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                    //this is how we display  are selected file
                });
            });
        }

        // setting again  loading back to false and input,selected file  to null
        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    };


    const addImageToPost = (e) => {
        //Initialize a file reader
        const reader = new FileReader();
        // check if there is a file and read it as a data url
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }


        // onload and get that event back

        reader.onload = (readerEvent) => {
            //use that url and display the image
            setSelectedFile(readerEvent.target.result);
        };

    };

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };

    



    return (
        <div className={`border-b border-gray-700 p-3
        flex space-x-3 overflow-y-scroll ${loading && "opacity-60"}`}>
            <img
                src= {session.user.image} alt=" " className="h-11 w-11 rounded-full cursor-pointer"
            />
            <div className="w-full divide-y divide-gray-700">
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea value={input}
                        onChange={(e) => setInput(e.target.value.replace(/[!$(){}[\]:;<+?\\>@%^%^&.*_,""-]/g, ""))}
                        rows="2"
                        textlimit="5"
                        maxLength={50} 
                        placeholder="What's happening?"
                        className="bg-transparent outline-none text-[#d9d9d9]
                        text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"/>
                    {selectedFile && (
                        <div className="relative">
                            <div className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26]
                            bg-opacity-75 rounded-full flex items-center
                            justify-center top-1 cursor-pointer" onClick={() => setSelectedFile(null)}>
                                <XIcon className="text-white h-5" />
                            </div>
                            <img src={selectedFile} alt="" className="rounded-2xl
                            max-h-80 object-contain"/>
                        </div>
                    )}
                </div>
                {!loading && (
                    <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                            <div className="icon" onClick={() => filePickerRef.current.click()}>
                                <PhotographIcon className="h-[22px] text-[#229758]" />
                                <input type='file' hidden onChange={addImageToPost} ref={filePickerRef} />
                            </div>
                            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                                <EmojiHappyIcon className="text-[#229758] h-[22px]" />
                            </div>

                            {showEmojis && (
                                <Picker
                                    onEmojiClick={addEmoji}
                                    width={300}
                                    height={350}
                                    theme="dark"
                                />
                            )}
                        </div>
                        <button className="bg-[#229758] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#147742] disabled:hover:bg-[#229758] disabled:opacity-50 disabled:cursor-default"
                            disabled={!input.trim() && !selectedFile}
                            onClick={sendPost}
                        >Tweet</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Input