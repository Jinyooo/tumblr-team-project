import "./DesignsGrid.scss";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CUP_PICS } from "../../../images";
import { ButtonComp, ModalComp, ProfileComp } from "../../index-comp/IndexComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
//import { getMyDesign } from "../../../modules/uploadDesign";
import { useDispatch, useSelector } from "react-redux";
import { getFirebaseData } from "../../../datasources/firebase";
import { loadingStart, loadingEnd } from "../../../modules/loading";
import { useCallback } from "react";
import { deepCopy } from "@firebase/util";
import { useNavigate } from "react-router-dom";

export default function MyDesigns() {
    const [ mydesigns, setmydesigns ] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const startLoading = useCallback(dispatch(loadingStart()));
    const endLoading = useCallback(dispatch(loadingEnd()));

    // 나의디자인 가져오기
    const getMyDesign = () => async () => {
        try {
            let array = [];
            const myDesignColRef = getFirebaseData("MyDesign"); // 파이어스토어 컬렉션 문서 가져오기
            (await myDesignColRef).forEach( (doc) => {
                array.push({ 
                    id: doc.data().id, 
                    title: doc.data().title, 
                    text: doc.data().text,
                    image: doc.data().image,
                    tag: doc.data().tag,
                    private: doc.data().private
                }); 
            });
            setmydesigns(array);
        }
        catch (err) {
            console.log(err.message);
        }
    }
    
    useEffect( ()=> {
        dispatch(getMyDesign());
    }, [])

    return (
        <>
        <div className="header">
            <h3 id="title">나의 디자인</h3>
            <a href="#">더보기</a>
        </div>

        <Container fluid="sm">
        <Row>
            {
                mydesigns.map( design => (
                    <Col xs="6" md="3" key={design.id}>
                        <ModalComp 
                        button={
                            <div id="temp_image">
                                <p>{design.title}</p>
                            </div>
                            }//<img id="preview-image" src={design.image} alt={design.title}/>
                        image={<img src={design.image} alt={design.title}/>}
                        className="design_modal"
                        >
                        <div className="modal_head">
                            <h2>{design.title}</h2>
                            {design.private === true ? (
                                <span><FontAwesomeIcon icon={solid("lock")}/> 비공개 게시물입니다</span>) 
                                : null}
                        </div>

                        <div className="modal_body">
                            <p>{design.text}</p>
                            <p> 공개여부 : {design.private} </p>
                            <div className="hashtag">
                                { design.tag.map( (tag, i) => (
                                    <span key={i}>{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="modal_footer">
                            
                            <ProfileComp
                            className="profile" 
                            justName 
                            userName={"user1"} 
                            imageURL={'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'}
                            />
                            
                            <div className="button_block">
                            <ButtonComp icon id="like_btn">
                                <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                            </ButtonComp>
                            <ButtonComp icon id="share-btn">
                                <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                            </ButtonComp>  
                            <ButtonComp icon id="create-btn" onClick={() => {navigate('/create')}}>
                                제작하러가기
                            </ButtonComp>
                            </div>
                        </div>
                            
                        
                    </ModalComp>
                </Col>
            ))}
        </Row>
        <Row>
            {
                CUP_PICS.map( cup_pic=>(
                <Col xs="6" md="3" key={cup_pic.id}>
                    <ModalComp 
                    button={<img id="preview-image" src={cup_pic.src} alt={cup_pic.title}/>}
                    image={<img src={cup_pic.src} alt={cup_pic.title}/>}
                    className="design_modal"
                    >
                    <div className="modal_head">
                        <div className="text_block">
                        <h2>제목</h2>
                        
                        </div>
                    </div>

                    <div className="modal_body">
                        <p>내용</p>
                        <div className="hashtag">
                        <span>#태그1 </span>
                        <span>#태그2 </span>
                        <span>#태그3 </span>
                        </div>
                    </div>

                    <div className="modal_footer">
                        <ProfileComp
                        className="profile" 
                        justName 
                        userName={"user1"} 
                        imageURL={'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'}
                        />
                        <div className="button_block">
                        <ButtonComp icon id="like_btn">
                            <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                        </ButtonComp>
                        <ButtonComp icon id="share-btn">
                            <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                        </ButtonComp>  
                        <ButtonComp icon id="create-btn" onClick={() => {navigate('/create')}}>
                            제작하러가기
                        </ButtonComp>
                        </div>
                    </div>
                        
                    
                </ModalComp>
                </Col>
                ))
            }
            </Row>
        </Container>
    </>
    );
}
