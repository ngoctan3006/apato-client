import { CancelOutlined } from '@mui/icons-material';
import {
  Button,
  Chip,
  Dialog,
  Grid,
  IconButton,
  ListItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createPost, getAllTags } from '../../api/post';
import { Input, Label } from '../../pages/LoginPage/styled';
import { getAllTag, selectTags, Tag } from '../../redux/slices/postSlice';
import {
  addPendingPost,
  endLoading,
  startLoading,
} from '../../redux/slices/sellerSlice';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  title: string;
  price: number;
  area: number;
  address: string;
  image: FileList;
  CMND: FileList;
  imgApart: FileList;
  'land-use': FileList;
  room_count: number;
  district: string;
  university: string;
  detail: string;
}

export const Required: React.FC = () => {
  return (
    <Typography
      component="span"
      sx={{
        color: '#d32f2f',
        fontSize: '12px',
        fontWeight: 'bold',
        ml: 0.5,
      }}
    >
      *
    </Typography>
  );
};

const CreatePostModal: React.FC<Props> = ({ open, onClose }) => {
  const tagsList = useSelector(selectTags);
  const [tags, setTags] = React.useState<Tag[]>(tagsList);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const dispatch = useDispatch();
  const [errorTag, setErrorTag] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleAdd = (tag: Tag) => () => {
    setSelectedTags((prev: Tag[]) => [...prev, tag]);
    setTags((tags: Tag[]) => tags.filter((t) => t.id !== tag.id));
  };

  const handleDelete = (tag: Tag) => () => {
    setSelectedTags((tags: Tag[]) => tags.filter((t) => t.id !== tag.id));
    setTags((prev: Tag[]) => [...prev, tag]);
  };

  const loadAllTags = async () => {
    try {
      const { data } = await getAllTags();
      dispatch(getAllTag(data));
    } catch (error: any) {}
  };

  const submitPost = async (data: FormValues) => {
    if (selectedTags.length === 0) {
      setErrorTag(true);
      return;
    }

    const postData = new FormData();
    postData.append('title', data.title);
    postData.append('detail', data.detail);
    postData.append('price', data.price.toString());
    postData.append('room_count', data.room_count.toString());
    postData.append('district', 'Hai Ba Trung');
    postData.append('university', 'HUST');
    postData.append('address', data.address);
    postData.append('area', data.area.toString());
    for (let i = 0; i < data.image.length; i++) {
      postData.append('file', data.image[i]);
    }
    postData.append('file', data.CMND[0]);
    postData.append('file', data.imgApart[0]);
    postData.append('file', data['land-use'][0]);
    for (let i = 0; i < selectedTags.length; i++) {
      postData.append('tags', selectedTags[i].id.toString());
    }

    try {
      dispatch(startLoading());
      const { data } = await createPost(postData);
      dispatch(addPendingPost(data));
      toast.success('Đăng tải thành công!');
      reset();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadAllTags();
  }, []);

  useEffect(() => {
    setTags(tagsList);
  }, [tagsList]);

  useEffect(() => {
    setErrorTag(false);
  }, [selectedTags]);

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 1000,
          bgcolor: '#fff',
          borderRadius: 5,
          padding: '32px 47px 34px 59px',
        },
      }}
      scroll="paper"
      open={open}
      onClose={onClose}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
        size="small"
        onClick={onClose}
      >
        <CancelOutlined />
      </IconButton>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        Yêu cầu đăng tải mới
      </Typography>

      <form onSubmit={handleSubmit(submitPost)}>
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={6}>
            <Label>
              Tiêu đề
              <Required />
            </Label>
            <Input
              size="small"
              type="text"
              fullWidth
              {...register('title', {
                required: true,
              })}
              error={!!errors.title}
              helperText={errors.title && 'Ban chưa nhập tiêu đề'}
            />
            <Label>
              Địa chỉ
              <Required />
            </Label>
            <Input
              size="small"
              type="text"
              fullWidth
              {...register('address', {
                required: true,
              })}
              error={!!errors.address}
              helperText={errors.address && 'Bạn chưa nhập địa chỉ'}
            />
            <Label>
              Diện tích
              <Required />
            </Label>
            <Input
              size="small"
              type="number"
              fullWidth
              {...register('area', {
                required: true,
              })}
              error={!!errors.area}
              helperText={errors.area && 'Bạn chưa nhập diện tích'}
            />
            <Label>
              Số phòng
              <Required />
            </Label>
            <Input
              size="small"
              type="number"
              fullWidth
              {...register('room_count', {
                required: true,
              })}
              error={!!errors.room_count}
              helperText={errors.room_count && 'Bạn chưa nhập số phòng'}
            />
            <Label>
              Giá thuê
              <Required />
            </Label>
            <Input
              size="small"
              type="number"
              fullWidth
              {...register('price', {
                required: true,
              })}
              error={!!errors.price}
              helperText={errors.price && 'Bạn chưa nhập giá thuê'}
            />
          </Grid>
          <Grid item xs={6}>
            <Label>
              Ảnh chụp giới thiệu phòng
              <Required />
            </Label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register('image')}
            />
            <Label>
              Tags
              <Required />
            </Label>
            <Paper
              sx={{
                display: selectedTags.length ? 'flex' : 'none',
                flexWrap: 'wrap',
                listStyle: 'none',
                border: '1px solid #e2e8f0',
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {selectedTags.map((tag) => {
                return (
                  <ListItem
                    key={tag.id}
                    sx={{
                      width: 'fit-content',
                      p: 1,
                    }}
                  >
                    <Chip
                      label={tag.tag_name}
                      variant="outlined"
                      size="small"
                      color="secondary"
                      onDelete={handleDelete(tag)}
                    />
                  </ListItem>
                );
              })}
            </Paper>
            <Stack direction="row" flexWrap="wrap" mt={1}>
              {tags.map((tag) => (
                <Button
                  onClick={handleAdd(tag)}
                  key={tag.id}
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    fontSize: 12,
                    mr: 1,
                    mb: 1,
                  }}
                  color="secondary"
                >
                  {tag.tag_name}
                </Button>
              ))}
            </Stack>
            {errorTag && (
              <Typography
                sx={{
                  color: '#d32f2f',
                  fontStyle: 'italic',
                  fontSize: 12,
                }}
              >
                Bạn chưa chọn tag
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Label>
              Mô tả
              <Required />
            </Label>
            <Input
              size="small"
              type="text"
              multiline
              minRows={3}
              maxRows={4}
              fullWidth
              {...register('detail', {
                required: true,
              })}
              error={!!errors.detail}
              helperText={errors.detail && 'Bạn chưa nhập mô tả'}
            />
          </Grid>
          <Grid item xs={12}>
            <Label
              sx={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Minh chứng
            </Label>
            <Typography
              sx={{
                textAlign: 'center',
                fontStyle: 'italic',
                fontSize: 14,
              }}
            >
              Để xác thực thông tin phòng bạn đăng tải là chính xác, vui lòng
              cung cấp ảnh chụp các loại giấy tờ sau
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Label>
              Chứng minh nhân dân
              <Required />
            </Label>
            <input type="file" accept="image/*" {...register('CMND')} />
          </Grid>
          <Grid item xs={4}>
            <Label>
              Mặt tiền căn nhà, kèm biển địa chỉ
              <Required />
            </Label>
            <input type="file" accept="image/*" {...register('imgApart')} />
          </Grid>
          <Grid item xs={4}>
            <Label>
              Giấy sở hữu nhà đất
              <Required />
            </Label>
            <input type="file" accept="image/*" {...register('land-use')} />
          </Grid>

          <Grid item xs={4} mx="auto">
            <Stack mt={2} direction="row" spacing={4} justifyContent="center">
              <Button
                sx={{ textTransform: 'none' }}
                variant="outlined"
                color="error"
                fullWidth
                onClick={onClose}
              >
                Hủy
              </Button>
              <Button
                sx={{ textTransform: 'none' }}
                type="submit"
                variant="outlined"
                fullWidth
              >
                Gửi yêu cầu
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default CreatePostModal;
