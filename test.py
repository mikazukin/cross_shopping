import pyqrcode
#パソコン内蔵：カメラ起動
import cv2
# VideoCapture オブジェクトを取得します
capture = cv2.VideoCapture(0)   #今はすま
while(True):
    ret, frame = capture.read()
    cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
capture.release()
cv2.destroyAllWindows()