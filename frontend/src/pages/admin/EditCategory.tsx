import React, { useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  ReadCategory,
  updateCategory,
} from "../../features/Categorys/Category.slice";
import { CategoryType } from "../../types/CategoryType";

type Props = {};

const EditCategory = (props: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(ReadCategory(id!));
      reset(payload);
    })();
  }, []);
  const onEdit = async (data: CategoryType) => {
    try {
      await dispatch(updateCategory(data));

      toastr.success("Sửa thành công");
      navigate("/admin/categorys");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Sửa danh mục</h1>
      <form onSubmit={handleSubmit(onEdit as any)}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            {...register("name")}
            id="exampleFormControlInput1"
            placeholder="Áo polo"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-info">
            Sửa danh mục
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
