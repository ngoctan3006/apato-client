import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/service';
import AppText from '../../components/AppText/AppText';
import { showErrorToast, showSuccessToast } from '../../components/Toast/Toast';
import usePost from '../../hook/usePost';
import styles from './PostApartPage.module.css';

const PostApartPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { savePost } = usePost();

  const token = localStorage.getItem('accessToken');

  const submitPost = (data: any) => {
    console.log('HTD', data);
    const newData = {
      ...data,
      file: [
        data.image[0],
        data.CMND[0],
        data.imgApart[0],
        data['land-use'][0],
      ],
    };

    console.log('NEW DATA', newData);

    createPost(newData, token!)
      .then((res) => {
        console.log(res);
        savePost(res);
        console.log('Created Post successfully');
        showSuccessToast('Created Post successfully!');
        navigate('/apart-management');
      })
      .catch((e) => {
        console.log(e);
        showErrorToast(e?.response?.data?.message);
      });
  };

  const postHandler = (data: any) => {
    console.log(data);
    submitPost(data);
  };
  return (
    <div className={styles.container}>
      <h3>Yêu cầu đăng tải mới</h3>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(postHandler)}
      >
        <div>
          <label htmlFor="title">
            Tiêu đề <span>*</span>
          </label>
          <input
            className={styles.inputTitle}
            {...register('title', {
              required: true,
            })}
            name="title"
            type="text"
          />
          {errors.title?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập tiêu đề!
            </AppText>
          )}
        </div>
        <h3>Thông tin căn hộ</h3>

        <div>
          <label htmlFor="address">
            Địa chỉ <span>*</span>
          </label>
          <input
            className={styles.inputAddress}
            {...register('address', {
              required: true,
            })}
            name="address"
            type="text"
          />
          {errors.address?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập địa chỉ!
            </AppText>
          )}
        </div>
        <div>
          <label htmlFor="area">
            Diện tích (m2) <span>*</span>
          </label>
          <input
            className={styles.input1}
            {...register('area', {
              required: true,
            })}
            name="area"
            type="number"
          />
          {errors.area?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập diện tích!
            </AppText>
          )}
        </div>
        <div>
          <label htmlFor="inputImage">
            Ảnh chụp giới thiệu phòng <span>*</span>
          </label>
          <input
            className={styles.inputImage}
            {...register('image', {
              required: true,
            })}
            name="image"
            placeholder="Ảnh"
            type="file"
          />
          {errors.image?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa tải lên ảnh căn hộ!
            </AppText>
          )}
        </div>
        <div>
          <label htmlFor="price">
            Giá thuê (đ) <span>*</span>
          </label>
          <input
            className={styles.input1}
            {...register('price', {
              required: true,
            })}
            name="price"
            type="number"
          />
          {errors.price?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập giá!
            </AppText>
          )}
        </div>
        <img src="" alt="" />
        <div>
          <label htmlFor="detail">
            Mô tả <span>*</span>
          </label>
          <textarea
            className={styles.textArea}
            {...register('detail', { required: true, minLength: 8 })}
            name={'detail'}
          />
          {errors.detail?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập mô tả!
            </AppText>
          )}
        </div>
        <h3>Minh chứng</h3>
        <h4>
          Để xác thực thông tin phòng bạn đăng tải là chính xác, bạn vui lòng
          cung cấp ảnh chụp các loại giấy tờ sau
        </h4>
        <div className="fake-image-1">
          <label htmlFor="CMND">
            Chứng minh nhân dân <span>*</span>
          </label>
          <input
            {...register('CMND', {
              required: true,
            })}
            className={styles.inputImage}
            name="CMND"
            type="file"
          />
          {/* {errors.image?.type === 'required' && (
                <AppText className={styles.errorText} role="alert">
                  Image is required
                </AppText>
              )} */}
        </div>
        <div className="fake-image-2">
          <label htmlFor="img-apart-">
            Ảnh chụp mặt tiền căn nhà, kèm biển địa chỉ <span>*</span>
          </label>
          <input
            {...register('imgApart', {
              required: true,
            })}
            className={styles.inputImage}
            name="imgApart"
            type="file"
          />
          {/* {errors.image?.type === 'required' && (
                <AppText className={styles.errorText} role="alert">
                  Image is required
                </AppText>
              )} */}
        </div>
        <div className="fake-image-3">
          <label htmlFor="land-use">
            Giấy sở hữu nhà đất <span>*</span>
          </label>
          <input
            {...register('land-use', {
              required: true,
            })}
            className={styles.inputImage}
            name="land-use"
            type="file"
          />
          {/* {errors.image?.type === 'required' && (
                <AppText className={styles.errorText} role="alert">
                  Image is required
                </AppText>
              )} */}
        </div>
        <div>
          <Button
            sx={{
              borderRadius: '10px',
              padding: '10px 0',
              width: '380px',
              alignSelf: 'center',
            }}
            className="button-apart"
            variant="contained"
            type={'submit'}
            style={{
              fontSize: '16px',
              margin: '40px 0',
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostApartPage;
