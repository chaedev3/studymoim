package com.ssafy.peace.api;

import com.ssafy.peace.dto.FreeBoardDto;
import com.ssafy.peace.service.FreeBoardService;
import com.ssafy.peace.service.QuestionBoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "FreeBoardController", description = "자유 게시글 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles/free")
public class FreeBoardController {

    private final FreeBoardService freeBoardService;

    @Operation(summary = "get freeBoard list", description = "자유 게시판 글 목록 불러오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/")
    public ResponseEntity<?> boardList() {
        try{
            return new ResponseEntity<>(freeBoardService.getFreeBoardList(), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "post freeBoard", description = "자유 게시판 글 작성하기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/")
    public ResponseEntity<?> boardWrite(@RequestBody FreeBoardDto.Write freeBoard) {
        try{
            freeBoardService.writeFree(freeBoard);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
