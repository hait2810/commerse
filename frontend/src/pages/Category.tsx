import axios from "axios";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { NavLink, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import "../assets/css/category.css";
type Props = {};

const Category = (props: Props) => {
  const { id } = useParams();
  const { handleSubmit, register } = useForm();
  const [products, setProduct] = useState<any[]>([]);
  const [category, setCategory] = useState<any>({});
  document.title = category.name;
  const getProducts = async () => {
    const { data } = await axios.get(url);
    setProduct(data);
  };
  useEffect(() => {
    getProducts();
    const getCategory = async () => {
      const { data } = await axios.get(
        "https://commerse-production.up.railway.app/categorys/" + id
      );
      setCategory(data);
    };
    getCategory();
  },[]);
  const ONadd: SubmitHandler<any> = (data: any) => {
    
    if(data.select == 'new') {
         url = `https://commerse-production.up.railway.app/productsbycategory/${id}/createdAt/-1` 
    }else if(data.select == 'lowtohigh') {
      url = `https://commerse-production.up.railway.app/productsbycategory/${id}/price/-1` 
    }else if(data.select == 'hightolow'){
      url = `https://commerse-production.up.railway.app/productsbycategory/${id}/price/1`
    }
    getProducts(); 
  };
  let url = `https://commerse-production.up.railway.app/productsbycategory/${id}`
  
 
  
  
 
  return (
    <div>
      <div className="wrapper__heading">
        <div className="container">
          <ul className="heading dp-flex">
            <li>
              <NavLink className="remove__underline" to="/">
                Trang chủ
              </NavLink>
            </li>
            <li>
              <a className="remove__underline" href="#">
                Danh mục
              </a>
            </li>
            <li>
              <a className="remove__underline prioritized" href="#">
                {category.name}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="title__select">
        <div className="container">
          <div className="wrapper__title__select dp-flex space-beetwen">
            <h1 className="title">{category.name}</h1>
            <form onChange={handleSubmit(ONadd)}>
              <select {...register("select")} className="select">
                <option value="0">Mời bạn chọn</option>
                <option value="new">Sản phẩm mới nhất</option>
                <option value="lowtohigh">Giá từ thấp tới cao</option>
                <option value="hightolow">Giá từ cao tới thấp</option>
              </select>
            </form>
          </div>
        </div>
      </div>
      <section className="new__products">
        <div className="container">
          <div className="products dp-grid">
            {products?.map((item) => {
              return (
                <div className="product" data-aos="fade-down">
                  <NavLink to={`/product/${item._id}`}>
                    <img src={item.img} alt="" className="product__img" />
                  </NavLink>
                  {item.discount ? (
                    <span className="promotion"> -{item.discount}% </span>
                  ) : (
                    ""
                  )}
                  <h3 className="product__name">
                    <NavLink
                      className="remove__underline"
                      to={`/product/${item._id}`}
                    >
                      {item.name}
                    </NavLink>
                  </h3>
                  <div className="product__price">
                    <span className="new__price">
                      {" "}
                      <NumberFormat
                        value={item.price - (item.price * item.discount) / 100}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />
                      ₫
                    </span>

                    {item.discount ? (
                      <del className="old__price">
                        <NumberFormat
                          value={item.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={""}
                        />
                        ₫
                      </del>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
