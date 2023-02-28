import React, { ChangeEvent, FC, useState } from 'react';
import { Modal } from 'react-overlays';
import { Text } from '@shared/Text';
import { Button } from '@shared/Button';
import { ButtonCancel } from '@shared/ButtonCancel';
import { AddTweetModalPropsType } from '@/components/AddTweetModal/type';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { addTweetForLoggedUser } from '@/store/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const AddTweetModal: FC<AddTweetModalPropsType> = ({
  isOpen,
  renderBackdrop,
  close,
}) => {
  const dispatch = useAppDispatch();
  const currentLoggedUser = useAppSelector(
    (state) => state.users.currentLoggedUser
  );
  const [value, setValue] = useState('');

  const addTweet = () => {
    if (currentLoggedUser) {
      dispatch(
        addTweetForLoggedUser({
          currentLoggedUser,
          tweet: {
            text: value,
            likes: [],
            date: getCurrentDate(),
          },
        })
      );
    }
    setValue('');
    close();
  };

  const cancelClick = () => {
    setValue('');
    close();
  };

  const changeTextClick = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <Modal
      className="fixed z-10 top-0 left-0 bottom-0 right-0"
      show={isOpen}
      renderBackdrop={renderBackdrop}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-amber-50 rounded-3xl p-5 w-1/4">
          <div className="flex flex-row justify-between items-center py-2">
            <Text>Add tweet</Text>
            <ButtonCancel onClick={cancelClick}>x</ButtonCancel>
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-lime-200 rounded-lg border border-gray-300 focus:ring-lime-500 focus:border-lime-500 "
            placeholder="Write your thoughts here..."
            value={value}
            onChange={changeTextClick}
          />

          <div className="flex flex-row justify-evenly items-center py-5">
            <Button background type="button" onClick={addTweet}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
