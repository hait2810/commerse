import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  readProduct,
  updateProduct,
} from "../../features/Products/Product.slice";
import { ListSize } from "../../features/Size/Size.slice";
import { listCategory } from "../../features/Categorys/Category.slice";
import { CategoryType } from "../../types/CategoryType";
import { SizeType } from "../../types/SizeType";
type Props = {};

const UpdateProduct = (props: Props) => {
  const navigate = useNavigate();
 
  const [avatar, setAvatar] = useState("");
  
  const [imgs, setImgs] = useState<any[]>([]);
  const [color, setColor] = useState<any[]>([]);
  const [product, setProduct] = useState<any>({});
  const [content, setContent] = useState("");
  const dispatch = useDispatch<any>();
  document.title = product.name;
  const { id } = useParams();
  const { register, handleSubmit, formState, reset } = useForm<any>();
  const category = useSelector(
    (state: CategoryType) => state.category.categorys
  );
  const sizes = useSelector((state: SizeType) => state.size.sizes)
  useEffect(() => {
    dispatch(ListSize())
    dispatch(listCategory())

    const getProducts = async () => {
      const { payload } = await dispatch(readProduct(id!));
      console.log(payload);

      reset(payload);
      setProduct(payload);
      setAvatar(payload.img);
      setColor(payload.color);
      setImgs(payload.subimg);
    };
    getProducts();
  }, []);
  const uploadImg = async (files: any) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "assjshihi");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/hait-10/image/upload",
      formData
    );
    setAvatar(data.url);
  };
  let imglink: any[] = [];
  const uploadImgs = async (files: any) => {
    for (let index = 0; index < files.length; index++) {
      const formData = new FormData();
      formData.append("file", files[index]);
      formData.append("upload_preset", "assjshihi");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/hait-10/image/upload",
        formData
      );
      imglink.push(data.url);
    }
    setImgs(imglink);
  };
  let imgcolor: any[] = [];
  const uploadImgColor = async (files: any) => {
    for (let index = 0; index < files.length; index++) {
      const formData = new FormData();
      formData.append("file", files[index]);
      formData.append("upload_preset", "assjshihi");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/hait-10/image/upload",
        formData
      );
      imgcolor.push(data.url);
    }
    setColor(imgcolor);
  };
  const onCkeditora = async (event: any, editor: any) => {
    setContent(editor.getData());
  };

  const onAdd: SubmitHandler<any> = async (data: any) => {
    const products = {
      ...data,
      img: avatar,
      subimg: imgs,
      color: color,
      desc: content,
    };

    await dispatch(updateProduct(products));
    toastr.success("Sửa thành công");
    navigate("/admin/products");
  };
  return (
    <div>
      <h1>Sửa sản phẩm</h1>
      <div>
        <form onSubmit={handleSubmit(onAdd)}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className="form-control"
              {...register("name")}
              id="exampleFormControlInput1"
              placeholder="Áo"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Giá sản phẩm:
            </label>
            <input
              type="text"
              className="form-control"
              {...register("price")}
              id="exampleFormControlInput1"
              placeholder="123"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Giảm(%):
            </label>
            <input
              type="text"
              className="form-control"
              {...register("discount")}
              id="exampleFormControlInput1"
              placeholder="5"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Avatar:
            </label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => {
                uploadImg(event.target.files);
              }}
              id="inputGroupFile02"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Ảnh:
            </label>
            <input
              type="file"
              multiple
              className="form-control"
              onChange={(ev) => uploadImgs(ev.target.files)}
              id="inputGroupFile02"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Ảnh màu:
            </label>
            <input
              type="file"
              multiple
              className="form-control"
              onChange={(ev2) => uploadImgColor(ev2.target.files)}
              id="inputGroupFile02"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Chọn size (Bấm CTRL để chọn nhiều):
            </label>
            <select
              className="form-select"
              {...register("size")}
              multiple
              aria-label="multiple select example"
            >
              {sizes?.map((item:SizeType, index:number) => {
                return <option key={index ++} value={item.name}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Chọn danh mục:
            </label>
            <select
              className="form-select"
              {...register("category")}
              aria-label="select example"
            >
              <option value="">Bấm vào để chọn</option>
              {category?.map((item:CategoryType, index: number) => {
                return <option key={index ++} value={item._id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Mô tả:
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={product.desc}
              onChange={(event: any, editor: any) => onCkeditora(event, editor)}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Sửa sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
