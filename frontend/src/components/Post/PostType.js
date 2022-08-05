import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { postAnnouncement, postMeeting, postPhoto, postShare } from "../../api/apiCalls";

const PostType = (props) => {
    const { shareType } = props;
    const { username: loggedInUsername, role: loggedInRole, token, id } = useSelector(store => ({
        username: store.username,
        role: store.role[0],
        token: store.token,
        id: store.id,
    }));
    const [context, setContext] = useState();
    const [time, setTime] = useState();
    const [link, setLink] = useState();
    const [image, setImage] = useState();
    const [attachmentId, setAttachmentId] = useState();

    const min = new Date().toISOString().split("T")[0];

    useEffect(() => {
        setContext("");
        setTime("");
        setLink("");
        setImage("");
    }, [shareType])

    const onClickMeeting = async () => {
        const creds = {
            content: context,
            meetingTime: time,
            link: link,
            publisherId: id
        }
        try {
            await postMeeting(token, creds);
        } catch (error) {
            console.log(error);
        }
    }

    const onClickEvent = async () => {
        const creds = {
            content: context,
            publisherId: id
        }
        try {
            await postAnnouncement(token, creds);
        } catch (error) {

        }
    }
    const onClickPost = async () => {
        const creds = {
            content: context,
            publisherId: id,
            photoId : attachmentId,

        }
        try {
            await postShare(token, creds);
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }

        const file = event.target.files[0];

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setImage(fileReader.result);
            console.log(fileReader.result);
        };
        fileReader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('file', file);
        uploadFile(formData);
    };

    const uploadFile = async (fil) => {
        const creds = {
            fil,
        }

        const response = await postPhoto(token, fil);
        setAttachmentId(response.data);

    };

    const buttonEnabledMeeting = (link && context && time);
    const buttonEnabledEvent = (context && time);
    const buttonEnabledPost = (context);
    /* ----------------------- MEETÄ°NG -----------------------------*/
    if (shareType === "Meeting") {
        return (
            <div className="input-group">
                <div className="input-group date">
                    <input
                        type="date"
                        className="form-control rounded-corner"
                        min={min}
                        onChange={(event) =>
                            setTime(event.target.value)}

                    />
                </div>
                <div className="input-group">
                    <input type="text" className="form-control rounded-corner" placeholder="Link..."
                           onChange={(event) =>
                               setLink(event.target.value)} />

                </div>
                <div className="input-group">
                    <textarea className="form-control rounded-corner" placeholder="Context.."
                              onChange={(event) =>
                                  setContext(event.target.value)} />
                    <button className="btn btn-info" onClick={onClickMeeting}
                            disabled={!buttonEnabledMeeting}> Share Meeting </button>
                </div>

            </div>);
        /* -----------------------EVENT -----------------------------*/
    } else if (shareType === "Event") {
        return (<div className="input-group">
            <div className="input-group date">
                <input
                    type="date"
                    className="form-control"
                    min={min}
                    onChange={(event) =>
                        setTime(event.target.value)}

                />
            </div>
            <div>
                <textarea className="form-control"
                          onChange={(event) =>
                              setContext(event.target.value)} />
                <button className="btn btn-info" onClick={onClickEvent}
                        disabled={!buttonEnabledEvent}
                > Share Event </button>
            </div>

        </div>);
        /* -----------------------POST -----------------------------*/
    } else if (shareType === "Post") {
        return (<div>
            <div >
                <textarea className="form-control"
                          onChange={(event) => setContext(event.target.value)} />
            </div>
            <div className="custom-file">
                <form method="POST">
                    <input className="form-control" type="file" id="formFile"
                           onChange={onChangeFile}
                    />
                </form>

                {image && (
                    <img src={image} className="img-thumbnail" alt="" />
                )}
                <button className="btn btn-info" onClick={onClickPost}
                        disabled={!context}> Share </button>
            </div>
        </div>)
    }
    return (
        <div>

        </div>
    );
};

export default PostType;