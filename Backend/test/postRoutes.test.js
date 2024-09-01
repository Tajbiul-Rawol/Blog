import supertest from 'supertest';
import { expect } from 'chai';

process.env.PORT = 3001; // Set the port before importing the app
process.env.NODE_ENV = 'test'; // Set the environment to test

import app from '../app.js'; // Ensure the correct path to your app


let server;

before((done) => {
    server = app.listen(3001, () => {
        console.log('Test server running on port 3001');
        done();
    });
});

after((done) => {
    server.close(() => {
        console.log('Test server closed');
        done();
    });
});

describe('Blog Post API', () => {
    let postId; // Variable to store the ID of the created post

    it('should create a new post', async () => {
        const postData = {
            title: 'Test Post',
            content: 'This is a test post',
            author: 'Test Author',
        };

        const res = await supertest(app).post('/api/posts').send(postData);

        expect(res.status).to.equal(201);
        expect(res.body.data).to.have.property('id');
        expect(res.body.data.title).to.equal(postData.title);
        expect(res.body.data.author).to.equal(postData.author);
        expect(res.body.data.content).to.equal(postData.content);
        expect(res.body.data.created_at).to.be.a('string');

        postId = res.body.data.id; // Store the ID for later tests
    });

    it('should update an existing post', async () => {
        const updatedPostData = {
            title: 'Updated Test Post',
            content: 'This is an updated test post',
            author: 'Updated Test Author',
        };

        const res = await supertest(app).put(`/api/posts/${postId}`).send(updatedPostData);

        console.log(`res ${res}`);
        expect(res.status).to.equal(200); // Expect 200 OK for a successful update
        expect(res.body).to.have.property('id').that.equals(postId);
        expect(res.body.title).to.equal(updatedPostData.title);
        expect(res.body.author).to.equal(updatedPostData.author);
        expect(res.body.content).to.equal(updatedPostData.content);
        expect(res.body.created_at).to.be.a('string');
    });

        // Test for deleting data
    it('should delete an existing post', async () => {
         // Create a new post for testing the delete functionality
            const postData = {
                title: 'Post to Delete',
                content: 'This post will be deleted',
                author: 'Author',
            };

            const createRes = await supertest(app).post('/api/posts').send(postData);
            const postId = createRes.body.data.id;

            // Perform the delete operation
            const deleteRes = await supertest(app).delete(`/api/posts/${postId}`);

            expect(deleteRes.status).to.equal(200);
            expect(deleteRes.text).to.equal('Post deleted successfully');

            // Verify that the post no longer exists
            const getRes = await supertest(app).get(`/api/posts/${postId}`);
            expect(getRes.status).to.equal(404);
            expect(getRes.body.error).to.equal('404 Post not found');
    });
});