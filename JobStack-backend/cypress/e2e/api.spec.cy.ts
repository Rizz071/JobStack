/* eslint-disable @typescript-eslint/no-unsafe-assignment */
describe("template spec", () => {
  it("it should GET all users", () => {
    cy.request({
      method: "GET",
      url: "/users",
      // headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.equal(200);
      //other assertions you find convinient
    });
  });

  it("it should GET admin user", () => {
    cy.request({
      method: "GET",
      url: "/users/1",
      // headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.equal(200);
      //other assertions you find convinient
    });
  });

  it("it should GET all jobs", () => {
    cy.request({
      method: "GET",
      url: "/jobs/2",
      // headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.equal(200);
      //other assertions you find convinient
    });
  });

  it("it should GET one job", () => {
    cy.request({
      method: "GET",
      url: "/job/2",
      // headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.equal(200);
      //other assertions you find convinient
    });
  });

  it("it should POST one user", () => {
    cy.request(
      {
        method: "POST",
        url: "/users",
        // headers: { Content-Type: "application/json" },
        body: {
          username: "testuser10",
          password: "test_password_10",
          fullname: "Esi John",
        },
      }
      // headers: { Authorization: `Bearer ${token}` },
    ).then((res) => {
      expect(res.status).to.equal(201);
      console.log(res);
      //other assertions you find convinient
    });
  });

  it("it should CREATE and DELETE one user", () => {
    cy.request({
      method: "GET",
      url: "/users",
      // headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.equal(200);

      cy.request({
        method: "DELETE",
        url: "/users/" + res.body.slice(-1)[0].id,
        // headers: { Content-Type: "application/json" },
      }).then((res) => {
        expect(res.status).to.equal(204);
        //other assertions you find convinient
      });
    });
    //other assertions you find convinient
  });
});
