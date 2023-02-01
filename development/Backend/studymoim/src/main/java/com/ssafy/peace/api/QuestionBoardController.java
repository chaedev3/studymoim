package com.ssafy.peace.api;

import com.ssafy.peace.dto.FreeBoardDto;
import com.ssafy.peace.dto.QuestionBoardCommentDto;
import com.ssafy.peace.dto.QuestionBoardDto;
import com.ssafy.peace.entity.QuestionBoard;
import com.ssafy.peace.service.QuestionBoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "QuestionBoardController", description = "질문 게시글 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles/question")
public class QuestionBoardController {

    private final QuestionBoardService questionBoardService;

    @Operation(summary = "get questionBoard list", description = "질문 게시판 글 목록 불러오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/")
    public ResponseEntity<?> boardList() {
        try{
            return new ResponseEntity<>(questionBoardService.getQuestionBoardList(), HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "post questionBoard", description = "질문 게시판 글 작성하기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/")
    public ResponseEntity<?> boardWrite(@RequestBody

                                        QuestionBoardDto.Write questionBoard) {
        try{
            questionBoardService.writeQuestion(questionBoard);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "get questionBoard detail", description = "질문 글 상세 보기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{articleId}")
    public ResponseEntity<?> boardDetail(@Parameter(description="articleId") @PathVariable Integer articleId) {
        try{
            return new ResponseEntity<>(questionBoardService.getQuestionBoardDetail(articleId), HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "post questionBoard comment", description = "질문 게시판 댓글 작성하기")
    @PostMapping("/{articleId}/comment")
    public ResponseEntity<?> writeComment(@Parameter(description="articleId") @PathVariable Integer articleId,
                                          @RequestBody QuestionBoardCommentDto.Write comment) {
        try{
            return new ResponseEntity<>(questionBoardService.writeComment(articleId, comment), HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "questionBoard in Now Play page", description = "질문 게시판 댓글 작성하기")
    @GetMapping("/lecture/{lectureId}")
    public ResponseEntity<?> writeComment(@Parameter(description="lectureId") @PathVariable Integer lectureId) {
        try{
            return new ResponseEntity<>(questionBoardService.getQuestionBoardListByLecture(lectureId), HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
