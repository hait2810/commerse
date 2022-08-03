import React from 'react'


type Props = {}

const Footer = (props: Props) => {
  return (
    <div>
         
      <div className="container">
        <div className="footer dp-grid">
            <div className="shop_system">
                <h3 className="title">
                  HỆ THỐNG CỬA HÀNG
                </h3>
                <div className="list_system">
                    <div className="item">
                      <h5 className="province">HỒ CHÍ MINH : </h5>
                      <p>Quận 3 : 84 Trần Quang Diệu, Phường 14. </p>
                      <p>Open : 9:00 - 22:00</p>
                      <p>Quận 1 : The New Playground, Lê Lai</p>
                      <p>Open : 10:00 - 21:30</p>
                    </div>
                    <div className="item">
                      <h5 className="province">CẦN THƠ : </h5>
                      <p>Quận Ninh Kiều : 72 Nguyễn Việt Hồng, Phường An Phú. </p>
                      <p>Open : 9:00 - 21:30</p>
                      <p>Hotline : 0945.696.700</p>
                    </div>
                    <img src="https://theme.hstatic.net/1000340796/1000856039/14/logo-bct.png?v=4" alt="" className="temp" />
                </div>
               
            </div>
            <div className="policy dp-flex">
                <h3 className="title">
                  CHÍNH SÁCH
                </h3>
                <a className="remove__underline" href="">Câu hỏi thường gặp khi mua hàng</a>
                <a className="remove__underline" href="">Chính sách thanh toán và giao nhận</a>
                <a className="remove__underline" href="">Chính sách đổi trả</a>
                <a className="remove__underline" href="">Liên Hệ</a>
                <a className="remove__underline" href="">Tuyển dụng</a>
            </div>
            <div className="connect">
              <h3 className="title">
                KẾT NỐI VỚI CHÚNG TÔI
              </h3>
              <div className="social">
                <div className="item dp-flex align-items">
                 <a href=""> <img src="https://hait2810.github.io/assets/assets/img/icon_facebook.webp" alt="" /></a>
                  <a className="remove__underline" href="">Facebook</a>
                </div>
                <div className="item dp-flex align-items">
                  <a href=""> <img src="https://hait2810.github.io/assets/assets/img/icon_instagram.webp" alt="" /></a>
                   <a className="remove__underline" href="">Instagram</a>
                 </div>
                 <div className="item dp-flex align-items">
                  <a href=""> <img src="https://hait2810.github.io/assets/assets/img/icon-instagram_5d6bbc1211e64d2688b491dbe0b5a7a6.webp" alt="" /></a>
                   <a className="remove__underline" href="">Tiktok</a>
                 </div>
              </div>
            </div>
        </div>
      </div>
    
   
    </div>
  )
}

export default Footer