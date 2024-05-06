'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
import { Modal, Spin } from 'antd';

export default function profile() {
  const [posts, setPosts] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State to control modal visibility
  const [postToDelete, setPostToDelete] = useState(null); // State to store the post to delete
  const [deleting, setDeleting] = useState(false); // State to track delete operation
  const router = useRouter();
  const { data: session } = useSession();

  const fetchData = async () => {
    const res = await fetch(`/api/users/${session?.user?.id}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchData();
    }
  }, [session?.user?.id]);

  const handleEdit = (post:any) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = (post:any) => {
    // Set the post to delete and show the confirmation modal
    setPostToDelete(post);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      // Start the deleting process
      setDeleting(true);

      // Close the modal
      setDeleteModalVisible(false);

      // Perform deletion
      await fetch(`/api/prompt/${postToDelete?._id}`, {
        method: "DELETE",
      });

      // Filter out the deleted post locally
      setPosts(posts.filter((p) => p._id !== postToDelete?._id));
    } catch (error) {
      console.error("Error deleting prompt:", error);
    } finally {
      // Finish the deleting process
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    // Close the modal without performing deletion
    setDeleteModalVisible(false);
    setPostToDelete(null);
  };

  return (
    <>
      <div style={{ filter: deleting ? 'blur(3px)' : 'none' }}>
        <Profile
          name={session?.user?.name}
          desc='this is my profile page'
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      {/* Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
      >
        Are you sure you want to delete this post?
      </Modal>
      {/* Loading spinner */}
      {deleting && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999,
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
}
