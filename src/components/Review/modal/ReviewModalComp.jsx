import { ButtonComp, ModalComp, ModalComp2 } from "../../index-comp/IndexComp";
import "./ReviewModal.scss";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ReviewComp from "../grid/ReviewComp";

const ReviewModalComp = () => {
  const review = [
    { id: 1, name: "dd" },
    { id: 2, name: "dd" },
    { id: 3, name: "dd" },
    { id: 4, name: "dd" },
  ];

  return (
    <div>
      <Container fluid="sm">
        <Row>
          {review.map((r) => (
            <Col key={r.id}>
              {/** 올려진 리뷰 */}

              {/** 모달 전체 창 */}
              <ModalComp2
                title={"고객이 작성한 제목"}
                text={
                  "고객이 작성한 리뷰입니다.고객이 작성한 리뷰입니다.고객이 작성한리뷰입니다. 고객이 작성한 리뷰입니다.고객이 작성한 리뷰입니다.고객이작성한 리뷰입니다."
                }
                button={
                  <div>
                    <ButtonComp>
                      <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                    </ButtonComp>
                    <ButtonComp>
                      <FontAwesomeIcon
                        icon={solid("share-nodes")}
                      ></FontAwesomeIcon>
                    </ButtonComp>
                    <ButtonComp>디자인 보러가기</ButtonComp>
                  </div>
                }
              >
                <ReviewComp>
                  {/** 모달 콘텐츠 */}
                  <ModalComp username={"user"}></ModalComp>
                </ReviewComp>
              </ModalComp2>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default ReviewModalComp;
